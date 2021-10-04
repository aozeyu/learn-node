const express = require('express')
const router = express.Router()

router.post('/',(req, res) => {
  const {name} = req.body
  if (!name) {
    res.status(401).send('no auth successful')
  }
  res.status(200).send(`welcome ${name}`)
})

module.exports = router