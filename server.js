const express = require("express")
const mysql = require('mysql')
const path = require('path')
const bodyParser = require('body-parser');

const app = new express()
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jobarena'
});

let user_id = null;

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server!');
  });

app.use(express.static(path.join(__dirname, 'React' ,'dist')));
app.use(bodyParser.json());

app.get('/',(req,res)=>{ //When the user visits localhost:3000 it redirects him into our website's page
    res.sendFile(path.join(__dirname,'React' , 'dist' ,'index.html'));
})

app.get('/jobs',(req,res)=>{ //This retrieves the list of jobs that are available, will modify later to handle search
    const searchQuery = req.body.data.searchQuery
    conn.query('SELECT* from jobs',(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
})

app.post('/login',(req,res)=>{ //The function is made such that it return true if the login details are correct and returns false if the login details are wrong
    const username = req.body.username
    const password = req.body.password
    // console.log(username,password)
    const query = `SELECT* from login_details where username='${username}' and password='${password};'`
    conn.query(query,(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            if(result.length == 1){
                user_id = result[0].id
                res.send(result[0].type)
            }
            else{
                res.send(false)
            }
        }
    })
})

app.get('/recruiter/jobs',(req,res)=>{ //Recruiter homepage
    const query = `Select Jobs.job_id,Title,Organizations.organization_name,Location,Category,Description,COUNT(App_id) as count from Jobs inner join Applications on Jobs.job_id=Applications.job_id inner join Recruiter_details on Recruiter_details.rec_id = Jobs.rec_id inner join Organizations on Organizations.org_id = Recruiter_details.org_id where Jobs.rec_id=${user_id} group by Jobs.job_id;`
    conn.query(query,(error,result)=>{
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
    const query = `SELECT Title,Organization_name,Location,category,Description from Jobs inner join Recruiter_details on Jobs.rec_id=Recruiter_details.rec_id inner join Organizations on Recruiter_details.org_id=Organizations.org_id where job_id=${job_id};`
    conn.query(query,[job_id],(error,result)=>{
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
    const query = `Select Applications.App_id,CONCAT(First_name,' ',Last_Name) as name,Applications.cand_id as id,status,DATE(DATE_TIME) as date,TIME(DATE_TIME) as time,link,venue from Applications inner join Candidate_details on Applications.cand_id=Candidate_details.cand_id left join Interviews on Applications.App_id=Interviews.App_id where job_id=${job_id};`
    conn.query(query,(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            res.send(result)
        }
    })
})

app.get('recruiter/upcoming',(req,res)=>{
    const query = `Select Title,CONCAT(First_name,' ',Last_Name) as name,Applications.cand_id,DATE(DATE_TIME) as date,TIME(DATE_TIME) as time from Interviews inner join Applications on Interviews.App_id=Applications.App_id inner join Jobs on Applications.job_id=Jobs.job_id inner join Candidate_details on Applications.cand_id=Candidate_details.cand_id where Jobs.rec_id = ${user_id} order by date,time;`
    conn.query(query,(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            send(result)
        }
    })
})

const runQuery = () => {
    const query = 'DELETE from Interviews where DATE_TIME<NOW();';
    conn.query(query, (error, results, fields) => {
        if (error) throw error;
    });
};
  
  // Run the query every 5 seconds
setInterval(runQuery, 5000);


app.listen(3000, ()=>{
    console.log("Listening on port http://localhost:3000/");
})