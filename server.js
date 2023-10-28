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
app.get('/candidate_upcoming', (req, res) => {
    const userId = req.params.userId;
  
    // Fetch the user's profile from the database
    const query = `SELECT j.Title, i.DATE_TIME, c.First_Name || ' ' || c.Last_Name AS Candidate_Name FROM Candidate_details AS c JOIN Applications AS a ON c.cand_id = a.cand_id JOIN Interviews AS i ON a.App_id = i.App_id JOIN Jobs AS j ON a.job_id = j.job_id WHERE c.cand_id = ${userId};`;
    requestQueue.push({query: query,params :[]},(err, user) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      const recommendations = []; // Add job recommendations here
  
      res.json(recommendations);
    });
  });
app.get('/candidate_recommendations_job', (req, res) => {
    const userId = req.params.userId;
  
    // Fetch the user's profile from the database
    const query = `SELECT j.Title,o.Organization_name,j.Location,j.category,j.Description FROM Candidate_details AS c INNER JOIN Work_Exp AS w ON c.cand_id = w.cand_id INNER JOIN Jobs AS j ON w.job_Title = j.Title INNER JOIN Recruiter_details AS r ON j.rec_id = r.rec_id INNER JOIN Organizations AS o ON r.org_id = o.org_id WHERE c.cand_id = ${userId};`;
    requestQueue.push({query: query,params :[]},(err, user) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      const recommendations = []; // Add job recommendations here
  
      res.json(recommendations);
    });
  });
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



app.get('/status', (req, res) => {
    const { appid, job_id, cand_id, status, DATE_TIME, link, venue } = req.query;

    // Prepare the SQL queries
    const queries = [];

    queries.push({
        sql: 'UPDATE Applications SET status = ? WHERE App_id = ?;',
        params: [status, appid]
    });

    if (status === 'shortlisted') {
        queries.push({
            sql: 'INSERT INTO Interviews (App_id, DATE_TIME, link, venue) VALUES (?, ?, ?, ?);',
            params: [appid, DATE_TIME, link, venue]
        });

        queries.push({
            sql: 'INSERT INTO Notifications (cand_id, message) VALUES (?, ?);',
            params: [cand_id, `You have been shortlisted for the interview of ${job_id} on ${DATE_TIME} at ${venue}`]
        });
    } else if (status === 'rejected') {
        queries.push({
            sql: 'INSERT INTO Notifications (cand_id, message) VALUES (?, ?);',
            params: [cand_id, `You have been rejected for the job of ${job_id}`]
        });
    } else if (status === 'offered') {
        queries.push({
            sql: 'INSERT INTO Notifications (cand_id, message) VALUES (?, ?);',
            params: [cand_id, `You have been offered the job of ${job_id}`]
        });
    }

    // Execute the SQL queries
    conn.serialize(() => {
        conn.run('BEGIN TRANSACTION');
        queries.forEach(query => {
            conn.run(query.sql, query.params, err => {
                if (err) {
                    console.error(err);
                    conn.run('ROLLBACK');
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
            });
        });
        conn.run('COMMIT', () => {
            res.send('Queries executed successfully.');
        });
    });
});


app.post('/login',(req,res)=>{ //The function is made such that it return true if the login details are correct and returns false if the login details are wrong
    const username = req.body.username
    const password = req.body.password
    // console.log(username,password)
    const query = `SELECT* from login_details where username='${username}' and password='${password};'`
    requestQueue.push({query: query, params: []},(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
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