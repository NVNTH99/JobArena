const express = require("express")
const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const bodyParser = require('body-parser');
const async = require('async')

const app = new express()
const dbPath = path.join(__dirname,'jobarena.db')
const conn = new sqlite3.Database(dbPath);

const requestQueue = async.queue((task, callback) => {
    conn.all(task.query, task.params, (error, result) => {
        callback(error, result);
    });
}, 1);

app.use(express.static(path.join(__dirname, 'React' ,'dist')));
app.use(bodyParser.json());

app.get('/',(req,res)=>{ //When the user visits localhost:3000 it redirects him into our website's page
    res.sendFile(path.join(__dirname,'React' , 'dist' ,'index.html'));
})

app.post('/signup/candidate',(req,res)=>{

})

app.post('/signup/recruiter',(req,res)=>{

})

app.get('/jobs', (req, res) => {
    const searchQuery = req.query.searchQuery;
    const query = `SELECT * FROM jobs inner join Recruiter_details on Recruiter_details.rec_id=jobs.rec_id inner join Organizations on Organizations.org_id=Recruiter_details.org_id WHERE Title LIKE '%${searchQuery}%' or category LIKE '%${searchQuery}%' or Organizations.organization_name LIKE '%${searchQuery}%';`;
    requestQueue.push({ query: query, params: [] }, (error, result) => {
        if (error) {
            res.status(500).send('Internal Server Error');
        } else {
            res.send(result);
        }
    });
});

app.get('/candidate/recommended',(req,res)=>{
    // console.log("recommended request was called")
    const user_id = req.query.user_id
    let limit = ""
    if(req.query.limit){
        limit = " LIMIT " + req.query.limit
    }
    const query1 = `SELECT preference_category FROM Candidate_details where cand_id=${user_id}`
    requestQueue.push({ query: query1, params: [] }, (error, result) => {
        if (error) {
            res.status(500).send('Internal Server Error');
        } else {
            if(result.length == 1){
                console.log(result)
                const pref = result[0].preference_category.split(',').map(value=>"category like '%" + value + "%'")
                const query2 = "Select* from jobs where " + pref.join(" or ") + limit
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
    const query = `SELECT Organization_name, Title, Location, date(DATE_TIME) AS Date, time(DATE_TIME) AS Time FROM Organizations o JOIN Recruiter_details r ON o.org_id = r.org_id JOIN Jobs j ON r.rec_id = j.rec_id JOIN Applications a ON j.job_id = a.job_id JOIN Interviews i ON a.App_id = i.App_id WHERE cand_id = ${user_id};`
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
    const user_id = req.query.user_id
    const job_id = req.query.job_id
    const query = `INSERT INTO Applications (cand_id,job_id,status) values (${user_id},${job_id},'Pending')`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            console.log(`Inserted into Database Successfully ${user_id} ${job_id}`)
        }
    })
})

app.post('/candidate/profilesave',(req,res)=>{

})

app.get('/candidate/appliedjobs',(req,res)=>{
    const user_id = req.query.user_id
    const query = `SELECT a.App_id, a.status, j.* FROM Applications a JOIN Jobs j ON a.job_id = j.job_id WHERE a.cand_id = ${user_id};`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            console.log(`Inserted into Database Successfully ${user_id} ${job_id}`)
        }
    })
})

app.post('/login',(req,res)=>{ //The function is made such that it return true if the login details are correct and returns false if the login details are wrong
    const username = req.body.username
    const password = req.body.password
    // console.log(username,password,dbPath)
    const query = `SELECT* from login_details where username='${username}' and password='${password}';`
    // console.log(query)
    requestQueue.push({query: query, params: []},(error,result)=>{
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
})

app.get('/recruiter/jobs',(req,res)=>{ //Recruiter homepage
    const user_id = req.query.user_id
    const query = `Select Jobs.job_id,Title,Organizations.organization_name,Location,Category,Description,COUNT(App_id) as count from Jobs inner join Applications on Jobs.job_id=Applications.job_id inner join Recruiter_details on Recruiter_details.rec_id = Jobs.rec_id inner join Organizations on Organizations.org_id = Recruiter_details.org_id where Jobs.rec_id=${user_id} group by Jobs.job_id;`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
})


app.get('/recruiter/job',(req,res)=>{ //To get Job title and other details for the recruiter's job application page
    const job_id = req.query.job_id
    const query = `SELECT Title,Organization_name as companyName,Location,category,Description from Jobs inner join Recruiter_details on Jobs.rec_id=Recruiter_details.rec_id inner join Organizations on Recruiter_details.org_id=Organizations.org_id where job_id=${job_id};`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
})

app.get('/recruiter/job/candidates',(req,res)=>{ //To get the list of Candidates in the above application
    const job_id = req.query.job_id
    const query = `Select Applications.App_id,(First_name||' '||Last_Name) as name,Applications.cand_id as id,status,DATE(DATE_TIME) as date,TIME(DATE_TIME) as time,link,venue from Applications inner join Candidate_details on Applications.cand_id=Candidate_details.cand_id left join Interviews on Applications.App_id=Interviews.App_id where job_id=${job_id};`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
})

app.get('recruiter/upcoming',(req,res)=>{
    const user_id = req.query.user_id
    const query = `Select Title,(First_name||' '||Last_Name) as name,Applications.cand_id,DATE(DATE_TIME) as date,TIME(DATE_TIME) as time from Interviews inner join Applications on Interviews.App_id=Applications.App_id inner join Jobs on Applications.job_id=Jobs.job_id inner join Candidate_details on Applications.cand_id=Candidate_details.cand_id where Jobs.rec_id = ${user_id} order by date,time;`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            send(result)
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