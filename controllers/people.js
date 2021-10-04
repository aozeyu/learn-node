const { people } = require('../data')
const getPeople = (req,res) => {
  res.status(200).json({success: true, data: people})
}
module.exports = {
  getPeople
}