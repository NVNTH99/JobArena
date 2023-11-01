const express = require("express")
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const bodyParser = require('body-parser');
const async = require('async')
const cors = require('cors')

const app = new express()
const dbPath = path.join(__dirname,'jobarena.db')
const conn = new sqlite3.Database(dbPath);

const requestQueue = async.queue((task, callback) => {
    conn.all(task.query, task.params, (error, result) => {
        callback(error, result);
    });
}, 1);

app.use(cors())
app.use(express.static(path.join(__dirname, 'React')));
app.use(bodyParser.json());

app.get('/',(req,res)=>{ //When the user visits localhost:3000 it redirects him into our website's page
    res.sendFile(path.join(__dirname,'React', 'index.html'));
})

app.post('/login',(req,res)=>{ 
    const username = req.body.username
    let password = ''
    let query;
    parameters = [username]
    if(req.body.password){
        password = req.body.password
        query = `SELECT* from login_details where username=? and password=?;`
        parameters.push(password)
    }
    else{
        query = `SELECT* from login_details where username=?;`
    }
    // const password = req.body.password
    // console.log(username,password,dbPath)
    // const query = `SELECT* from login_details where username='${username}' and password='${password}';`
    // console.log(query)
    requestQueue.push({query: query, params: parameters},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            // console.log(result)
            if(result.length == 1){
                user_id = result[0].id
                res.send({
                    user_id: result[0].id,
                    type: result[0].type
                })
            }
            else{
                res.send(false)
            }
        }
    })
}) //Query Verified

app.post('/signup',(req,res)=>{
    const credentials = req.body.credential;
    const type = req.body.type;
    let organization = credentials.organization
    if(type === 'recruiter' && typeof organization === 'string'){
        const query0 = `Insert into Organizations (Organization_name) values (?)`
        requestQueue.push({ query: query0, params: [organization] }, (error, result) => {
            if (error) {
                res.status(500).send('Internal Server Error');
            } else {
                const query = `Select id from Organizations where Organization_name=?`
                requestQueue.push({ query: query, params: [organization] }, (error, result) => {
                    if (error) {
                        res.status(500).send('Internal Server Error');
                    } else {
                        organization = result[0].id
                    }
                });
            }
        });
    }
    const query1 = `INSERT INTO login_details (username,password,type) VALUES (?, ? , ?);`
    requestQueue.push({ query: query1, params: [credentials.username,credentials.password,type] }, (error, result) => {
        if (error) {
            console.log("Error1")
            res.status(500).send('Internal Server Error');
        } else {
            const query2 = `Select id from login_details where username=?`
            // if(type === 'candidate'){
            //     query2 = `INSERT INTO Candidate_details (First_Name,Last_Name,preference category) values ('${credentials.firstname}','${credentials.lastname}','');`
            // }
            // else if(type === 'recruiter'){
            //     query2 = `INSERT INTO `
            // }
            requestQueue.push({ query: query2, params: [credentials.username] }, (error, result) => {
                if (error) {
                    console.log("Error2")
                    res.status(500).send('Internal Server Error');
                } else {
                    const user_id = result[0].id
                    let query3
                    let parameters = []
                    if(type === 'candidate'){
                        // query3 = `INSERT INTO Candidate_details (cand_id,First_Name,Last_Name,preference_category) values (${user_id},'${credentials.firstname}','${credentials.lastname}','');`
                        query3 = `INSERT INTO Candidate_details (cand_id,First_Name,Last_Name,preference_category) values (?,?,?,?);`
                        parameters = [user_id,credentials.firstname,credentials.lastname,'']
                    }
                    else if(type === 'recruiter'){
                        // query3 = `INSERT INTO Recruiter_details (rec_id,First_Name,Last_Name,org_id) values (${user_id},'${credentials.firstname}','${credentials.lastname}',${organization})`
                        query3 = `INSERT INTO Recruiter_details (rec_id,First_Name,Last_Name,org_id) values (?,?,?,?)`
                        parameters = [user_id,credentials.firstname,credentials.lastname,organization]
                    }
                    requestQueue.push({ query: query3, params: parameters }, (error, result) => {
                        if (error) {
                            console.log("Error3")
                            res.status(500).send('Internal Server Error');
                        } else {
                            res.send({user_id:user_id});
                        }
                    });
                }
            });
        }
    });
})

app.get('/organizations',(req,res)=>{
    const query = `Select* from Organizations`
    requestQueue.push({ query: query, params: [] }, (error, result) => {
        if (error) {
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
})


app.get('/jobs', (req, res) => {
    const searchQuery = "%"+req.query.searchQuery+"%";
    // console.log(req.query.user_id)
    // let query = `SELECT o.Organization_name as company,j.* from jobs j join Recruiter_details r on r.rec_id=j.rec_id join Organizations o on o.org_id=r.org_id WHERE (j.Title LIKE '%${searchQuery}%' or j.category LIKE '%${searchQuery}%' or o.organization_name LIKE '%${searchQuery}%')`;
    let query = `SELECT o.Organization_name as company,j.* from jobs j join Recruiter_details r on r.rec_id=j.rec_id join Organizations o on o.org_id=r.org_id WHERE (j.Title LIKE ? or j.category LIKE ? or o.organization_name LIKE ?) AND j.Deadline > datetime('now')`;
    const parameters = [searchQuery,searchQuery,searchQuery]
    if(req.query.user_id){
        // query = query + ` AND NOT EXISTS ( SELECT 1 FROM Applications a WHERE a.cand_id = ${req.query.user_id} AND a.job_id = j.job_id)`
        query = query + ` AND NOT EXISTS ( SELECT 1 FROM Applications a WHERE a.cand_id = ? AND a.job_id = j.job_id)`
        parameters.push(req.query.user_id)
    }
    // console.log(query)
    requestQueue.push({ query: query, params: parameters }, (error, result) => {    
        if (error) {
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});

app.post('/application/statuschange',(req,res) => {
    // const { app_id, tostatus, date_time, venue, link } = req.body;
    const app_id = req.body.app_id
    const tostatus = req.body.tostatus
    const date_time = req.body.date_time
    const venue = req.body.venue
    const link = req.body.link
    const updateApplicationStatusQuery = `UPDATE Applications SET status = '${tostatus}' WHERE App_id = ${app_id};`;
    let insertIntoInterviewsQuery = '';
    let addNotificationQuery = '';

    switch (tostatus) {
        case 'Shortlisted':
            insertIntoInterviewsQuery = `INSERT INTO Interviews (App_id, DATE_TIME, link, venue) VALUES (${app_id}, '${date_time}', '${link}', '${venue}');`;
            addNotificationQuery = `INSERT INTO Notifications (cand_id, message) SELECT cand_id, 
                'You have been shortlisted for an interview with ' || o.Organization_name || ' for the position of ' || j.Title || '.' as message 
                FROM Applications a
                JOIN Jobs j ON a.job_id = j.job_id
                JOIN Recruiter_details r ON j.rec_id = r.rec_id
                JOIN Organizations o ON r.org_id = o.org_id
                WHERE a.App_id = ${app_id};`;
            break;
        case 'Offered':
            addNotificationQuery = `INSERT INTO Notifications (cand_id, message) SELECT cand_id, 
                'Congratulations! You have been offered the position of ' || j.Title || ' with ' || o.Organization_name || '.' as message 
                FROM Applications a
                JOIN Jobs j ON a.job_id = j.job_id
                JOIN Recruiter_details r ON j.rec_id = r.rec_id
                JOIN Organizations o ON r.org_id = o.org_id
                WHERE a.App_id = ${app_id};`;
            break;
        case 'Rejected':
            addNotificationQuery = `INSERT INTO Notifications (cand_id, message) SELECT cand_id, 
                'We regret to inform you that you have not been selected for the position of ' || j.Title || ' with ' || o.Organization_name || '.' as message 
                FROM Applications a
                JOIN Jobs j ON a.job_id = j.job_id
                JOIN Recruiter_details r ON j.rec_id = r.rec_id
                JOIN Organizations o ON r.org_id = o.org_id
                WHERE a.App_id = ${app_id};`;
            break;
        default:
            break;
    }

    const queries = [updateApplicationStatusQuery];
    if (insertIntoInterviewsQuery) {
        queries.push(insertIntoInterviewsQuery);
    }
    if (addNotificationQuery) {
        queries.push(addNotificationQuery);
    }

    queries.forEach((query) => {
        requestQueue.push({ query: query, params: [] }, (error, result) => {
            if (error) {
                console.error("Error: ", error);
                res.status(500).send('Internal Server Error');
            }
        });
    });

    res.send('Update successful'); //Change This
}) //Will have to change res.send

app.get('/candidate/recommended',(req,res)=>{
    // console.log("recommended request was called")
    const user_id = req.query.user_id
    let limit = ""
    if(req.query.limit){
        limit = " LIMIT " + req.query.limit
    }
    const query1 = `SELECT preference_category FROM Candidate_details where cand_id=${user_id}`
    // query1 = query1 + ` AND NOT EXISTS ( SELECT 1 FROM Applications a WHERE a.cand_id = ${req.query.user_id} AND a.job_id = j.job_id)`
    requestQueue.push({ query: query1, params: [] }, (error, result) => {
        if (error) {
            res.status(500).send('Internal Server Error');
        } else {
            if(result.length == 1){
                // console.log(result)
                const pref = result[0].preference_category.split(',').map(value=>"category like '%" + value + "%'")
                const query2 = "Select o.Organization_name as company,j.* from jobs j join Recruiter_details r on r.rec_id=j.rec_id join Organizations o on o.org_id=r.org_id where " + pref.join(" or ") +` AND NOT EXISTS ( SELECT 1 FROM Applications a WHERE a.cand_id = ${req.query.user_id} AND a.job_id = j.job_id)  AND j.Deadline > datetime('now')` + limit
                requestQueue.push({ query: query2, params: [] }, (error, result) => {
                    if (error) {
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.send(result);
                    }
                })
            }
            else{
                res.send(result)
            }
        }
    });
})

app.get('/candidate/upcoming',(req,res)=>{
    const user_id = req.query.user_id
    const query = `SELECT Organization_name as company, Title, Location, date(DATE_TIME) AS Date, time(DATE_TIME) AS Time,link,venue FROM Organizations o JOIN Recruiter_details r ON o.org_id = r.org_id JOIN Jobs j ON r.rec_id = j.rec_id JOIN Applications a ON j.job_id = a.job_id JOIN Interviews i ON a.App_id = i.App_id WHERE cand_id = ${user_id};`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
})

app.post('/candidate/jobapply',(req,res)=>{
    const user_id = req.body.user_id
    const job_id = req.body.job_id
    // query below shd check whether any null values are there in candidat_details
    const query1 =  `SELECT * FROM Candidate_details 
    WHERE cand_id = ${user_id} 
    AND (Gender IS NULL OR Disability IS NULL OR Date_of_Birth IS NULL OR Resume IS NULL OR Languages IS NULL);`
    // const query1 = `INSERT INTO Applications (cand_id,job_id,status) values (${user_id},${job_id},'Pending')`
    requestQueue.push({query: query1, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            if(result.length==0){
                const query2 = `INSERT INTO Applications (cand_id,job_id,status) values (${user_id},${job_id},'Pending')`
                requestQueue.push({query: query2, params: []},(error,result)=>{
                    if(error){
                        res.status(500).send('Internal Server Error')
                    }
                    else{
                        res.send(true)
                    }
                })
            }
            else{
                res.send(false)
            }
        }
    })
})

app.post('/candidate/profile',(req,res)=>{
    console.log(req.body.candidateDetails); 
    console.log(1);
})

app.get('/candidate/appliedjobs',(req,res)=>{
    const user_id = req.query.user_id
    const query = `SELECT a.App_id, a.status, j.*, o.Organization_name as company
    FROM Applications a 
    JOIN Jobs j ON a.job_id = j.job_id 
    JOIN Recruiter_details r ON j.rec_id = r.rec_id 
    JOIN Organizations o ON r.org_id = o.org_id 
    WHERE a.cand_id = ${user_id};
    `
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
})

app.post('/candidate/appliedjobs/withdraw',(req,res)=>{ //consider for shortlisted with interviews as well
    const app_id = req.body.app_id
    // console.log(app_id)
    const query1 = `DELETE from Interviews where App_id = ${app_id};`
    requestQueue.push({query: query1, params: []},(error,result)=>{
        if(error){
            console.log(error)
            res.status(500).send('Internal Server Error')
        }
        else{
            const query = `DELETE from Applications where App_id = ${app_id};`
            requestQueue.push({query: query, params: []},(error,result)=>{
                if(error){
                    console.log(error)
                    res.status(500).send('Internal Server Error')
                }
                else{
                    res.send(true)
                }
            })
        }
    })
})

app.get('/notifications',(req,res)=> {
    const cand_id = req.query.cand_id
    const query = `Select message from Notifications where cand_id=?;`
    requestQueue.push({query: query, params: [cand_id]},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
})

app.get('/recruiter/jobs',(req,res)=>{ //Recruiter homepage
    const user_id = req.query.user_id
    const query = `Select Jobs.job_id,Title as title, Organizations.organization_name as company, Location as location, Category as category, Description as description, COUNT(App_id) as count from Jobs left join Applications on Jobs.job_id=Applications.job_id inner join Recruiter_details on Recruiter_details.rec_id = Jobs.rec_id inner join Organizations on Organizations.org_id = Recruiter_details.org_id where Jobs.rec_id=${user_id} group by Jobs.job_id;`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
}) //Query verified

app.post('/recruiter/removeJob',(req,res)=>{
    const job_id = req.query.job_id
    const user_id = req.query.job_id
    const notificationQuery = `INSERT INTO Notifications (cand_id, message) SELECT cand_id, 
        'You have been rejected for ' || Title || ' at ' || Organization_name as message 
        FROM Applications 
        INNER JOIN Jobs ON Applications.job_id = Jobs.job_id 
        INNER JOIN Recruiter_details ON Jobs.rec_id = Recruiter_details.rec_id 
        INNER JOIN Organizations ON Recruiter_details.org_id = Organizations.org_id 
        WHERE Applications.job_id = ${job_id} AND (status = 'Pending' OR status = 'Shortlisted' OR status = 'Offered');`;
    const deleteApplicationsQuery = `DELETE FROM Applications WHERE job_id = ${job_id};`;
    const deleteInterviewsQuery = `DELETE FROM Interviews WHERE App_id IN (SELECT App_id FROM Applications WHERE job_id = ${job_id});`;
    const deleteJobsQuery = `DELETE FROM Jobs WHERE job_id = ${job_id};`;
    const deleteQueries = [notificationQuery, deleteInterviewsQuery, deleteApplicationsQuery, deleteJobsQuery];
    deleteQueries.forEach((query) => {
        requestQueue.push({ query: query, params: [] }, (error, result) => {
            if (error) {
                console.error("Error: ", error);
                res.status(500).send('Internal Server Error');
            }
        });
    });
    // res.send(true);
    const query = `Select Jobs.job_id,Title as title, Organizations.organization_name as company, Location as location, Category as category, Description as description, COUNT(App_id) as count from Jobs left join Applications on Jobs.job_id=Applications.job_id inner join Recruiter_details on Recruiter_details.rec_id = Jobs.rec_id inner join Organizations on Organizations.org_id = Recruiter_details.org_id where Jobs.rec_id=${user_id} group by Jobs.job_id;`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
}) //Query Verified


app.get('/recruiter/job',(req,res)=>{ //To get Job title and other details for the recruiter's job application page
    const job_id = req.query.job_id
    const query = `SELECT Title as title,Organization_name as companyName,Location as location,category,Description as description from Jobs inner join Recruiter_details on Jobs.rec_id=Recruiter_details.rec_id inner join Organizations on Recruiter_details.org_id=Organizations.org_id where job_id=${job_id};`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result[0])
        }
    })
})

app.get('/recruiter/job/candidates',(req,res)=>{ //To get the list of Candidates in the above application
    const job_id = req.query.job_id
    const query = `SELECT Applications.App_id,
        (First_name || ' ' || Last_Name) as name,
        Applications.cand_id as id,
        status,
        strftime('%Y-%m-%d', DATE_TIME) as date,
        strftime('%H:%M:%S', DATE_TIME) as time,
        link,
        venue
        FROM Applications
        INNER JOIN Candidate_details ON Applications.cand_id = Candidate_details.cand_id
        LEFT JOIN Interviews ON Applications.App_id = Interviews.App_id
        WHERE job_id = ${job_id};`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
}) //Query almost verified .... if error its retrieving date and time

app.get('/recruiter/upcoming',(req,res)=>{
    const user_id = req.query.user_id
    const query = `SELECT Jobs.Title as title,
        (Candidate_details.First_name || ' ' || Candidate_details.Last_Name) as name,
        Applications.cand_id as id,
        strftime('%Y-%m-%d', Interviews.DATE_TIME) as date,
        strftime('%H:%M:%S', Interviews.DATE_TIME) as time
        FROM Interviews
        INNER JOIN Applications ON Interviews.App_id = Applications.App_id
        INNER JOIN Jobs ON Applications.job_id = Jobs.job_id
        INNER JOIN Candidate_details ON Applications.cand_id = Candidate_details.cand_id
        WHERE Jobs.rec_id = ${user_id}
        ORDER BY date, time;`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
}) //Query almost verified .... if error its retrieving date and time

app.get('/recruiter/candidateprofile', (req, res) => {
    const cand_id = req.query.cand_id;
    const query1 = `Select * from Candidate_details where cand_id=?;`;
    const query2 = `Select * from Education where cand_id=?;`;
    const query3 = `Select * from Work_Exp where cand_id=?;`;
    const query4 = `Select * from Projects where cand_id=?;`;
    const queries = [query1, query2, query3, query4];
    const promises = [];

    queries.forEach((query) => {
        promises.push(
            new Promise((resolve, reject) => {
                requestQueue.push({ query: query, params: [cand_id] }, (error, result) => {
                    if (error) {
                        console.error("Error: ", error);
                        reject(error);
                    } else {
                        console.log(result);
                        resolve(result);
                    }
                });
            })
        );
    });

    Promise.all(promises)
        .then((results) => {
            res.send(results);
        })
        .catch((error) => {
            console.error("Error: ", error);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/application',(req,res)=>{ //To get Job title and other details for the recruiter's job application page
    const app_id = req.query.app_id
    const query = `Select status,link from Applications a left join Interviews i on a.App_id=i.App_id where a.App_id=?`
    requestQueue.push({query: query, params: [app_id]},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result[0])
        }
    })
})

const runQuery = () => {
    const query = 'DELETE from Interviews where datetime(DATE_TIME) < datetime("now");';
    requestQueue.push({query: query, params: []}, (error, results, fields) => {
        if (error) throw error;
    });
};
  
  // Run the query every 5 seconds
setInterval(runQuery, 5000);


app.listen(3000, ()=>{
    console.log("Listening on port http://localhost:3000/");
})