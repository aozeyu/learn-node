const morgan = require('morgan')
const {logger} = require('./logger')
const authorize = require('./authorize')
app.use(morgan('tiny'))
app.get('/',(req,res) => {
  console.log(req.user)
  res.send('Home Page')
})
app.get('/about',(req,res) => {
  console.log(req.user)
  res.send('About Page')
})