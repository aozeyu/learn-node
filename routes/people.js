const experss = require('express')
const router = experss.Router()
let {people} = require('../data')
router.get('/',(req,res) => {
  res.status(200).json({success: true, data: people})
})
router.post('/',(req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(404).send('without name')
  }
  res.status(201).send({success: true, data: [...people, name]})
})
router.post('/postman',(req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({success: false, msg: 'please shuru name'})
  }else {
    return res.status(201).send({success: true, people: name})
  }
})
router.put('/:id',(req, res) => {
  const {id} = req.params // params 里 结构出来的都是数字是字符串
  const { name } = req.body
  const person = people.find((person) => { return person.id === Number(id)})
  if (!person) {
    res.status(404).json({success: false, msg: 'person was not found'})
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name
    }
    return person
  })
  res.status(200).send({success: true, data: newPeople})
})
router.delete('/:id',(req, res) => {
  const person = people.find((person) => {
    return person.id === Number(req.params.id)
  })
  if (!person) {
    res.status(404).json({success: false, msg: 'person was not found'})
  }
  const newPeople = people.filter((person) => { return person.id !== Number(req.params.id)})
  res.status(200).json({success: true, data: newPeople})
})

module.exports = router