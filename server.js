const express = require("express")
const mysql = require('mysql')
const path = require('path');

const app = new express()
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jobarena'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Connected to the MySQL server!');
  });

app.use(express.static(path.join(__dirname, 'React' ,'dist')));

app.get('/',(req,res)=>{
    // res.send('Succesfull response');
    res.sendFile(path.join(__dirname,'React' , 'dist' ,'index.html'));
})

app.listen(3000, ()=>{
    console.log("Listening on port http://localhost:3000/");
})