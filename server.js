const express = require("express")
const mysql = require('mysql')
const path = require('path')

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

app.get('/login',(req,res)=>{
    res.redirect('/login')
})

app.post('/login/submit',(req,res)=>{ //The function is made such that it return true if the login details are correct and returns false if the login details are wrong
    const username = req.body.username
    const password = req.body.password
    conn.query('SELECT* from login_details where username=? and password=?',[username,password],(error,result)=>{
        if(error){
            res.status(500).send('Internal Server Error')
        }
        else{
            if(result.length == 1){
                user_id = result[0].id
                res.send({type:result[0].type})
            }
            else{
                res.json(false)
            }
        }
    })
})

app.listen(3000, ()=>{
    console.log("Listening on port http://localhost:3000/");
})