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
let job_id = null;

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server!');
  });

app.use(express.static(path.join(__dirname, 'React' ,'dist')));
app.use(bodyParser.json());

app.get('/',(req,res)=>{ //When the user visits localhost:3000 it redirects him into our website's page
    res.sendFile(path.join(__dirname,'React' , 'dist' ,'index.html'));
})

app.get('/jobs',(req,res)=>{
    const searchQuery = req.query.searchQuery; // Retrieving search query from query parameters
     
    // Performing a SQL query to retrieve jobs based on the search query
    const query = `SELECT * FROM jobs WHERE Title LIKE '%${searchQuery}%'`; 

    //print query
   
  
    conn.query(query, (error, result) => {
      if (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).send('Internal Server Error');
      } else {
        //print result
        console.log(result);
        res.send(result); // Sending the list of jobs as a response
      }
    });
  });

app.post('/login',(req,res)=>{ //The function is made such that it return true if the login details are correct and returns false if the login details are wrong
    const username = req.body.username
    const password = req.body.password
    // console.log(username,password)
    conn.query('SELECT* from login_details where username=? and password=?',[username,password],(error,result)=>{
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



app.listen(3000, ()=>{
    console.log("Listening on port http://localhost:3000/");
})