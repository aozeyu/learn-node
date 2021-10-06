const express = require('express')
const mysql = require('mysql')

const app = express()
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
})
db.connect((err) => {
  if (err) {
    throw err
  }
  console.log('mysql connected')
})
//Create DB
app.get('/createdb',(req, res) => {
  let sql = 'CREATE DATABASE nodemysql'
  db.query(sql,(err,result) => {
    if(err) throw err;
    console.log(result)
    res.send('database has created...')
  })
})
app.listen(5000,() => {
  console.log('Server start on port 5000')
})