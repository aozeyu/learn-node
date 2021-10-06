const express = require('express')
const app = express()
const cos = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const dbService = require('./dbService')
app.use(cos()) //中间件
app.use(express.json()) // 能够以json的格式发送
app.use(express.urlencoded({extended: false}))

//create
app.post('/insert',(request,response) => {
  const {name} = request.body
  const db = dbService.getDbServiceInstance()
  const result = db.insertNewName(name)
  //data 
  result.then(data => response.json({data: data})).catch(err =>{console.log(err)})
})


app.get('/getAll',(request,response) => {
  const db = dbService.getDbServiceInstance()
   const result =  db.getAllData() // 返回一个promise从拿到数据库里数据
   // 拿到后端数据返回给浏览器的network中
   result.then(data => response.json({data: data})).catch(err => console.log(err))
})
app.delete('/delete/:id',(request,response) => {
  const {id} = request.params // 从url结构出来的id是一个字符串
  const db = dbService.getDbServiceInstance()
  const result = db.deleteById(id) // 数据库操作完返回的结果
  result.then(data => response.json({success: data})).catch(err => console.log(err))
})

app.patch('/update',(request,response) => {
  const {id,name} = request.body
  const db = dbService.getDbServiceInstance()
  const result = db.updateNameById(name, id)
  result.then(data => response.json({success: data})).catch(err => console.log(err))
})
app.get('/search/:name',(req,response) => {
  const { name } = req.params
  const db = dbService.getDbServiceInstance()
  const result = db.searchName(name)
  result.then(data => response.json({data: data})).catch(err => console.log(err))
})
app.listen(process.env.PORT,() => {
  console.log('app is running')
})