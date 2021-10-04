const express = require("express");
const people = require('./routes/people')
const auth = require('./routes/auth')
const app = express();

app.use(express.json()) //发请求后req => middleware => res 用 body-parse 解析将json 解析成对象 才能结构
app.use('/api/people',people)
app.use('/login',auth)
app.listen(5000, () => {
  console.log("server run on port 5000");
});
