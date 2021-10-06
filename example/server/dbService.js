const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()
let instance = null
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
})

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
})

class DbService{
  static getDbServiceInstance(){
    return instance ? instance : new DbService()
  }
  async getAllData(){
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names";
        connection.query(query,(err,results) => {
          if (err) reject(new Error(err.message));
          resolve(results) // 从数据库里查询到的数据
        })
      })
      return response // response = [{}]
    } catch (error) {
      console.log(error);
    }
  }

  async insertNewName(name) {
    //name是前端传过来的字段
    try {
      const dateAdded = new Date()
      const insertId = await new Promise((resolve, reject) => {
        //(name, date_added) 字段名 VALUES (?,?) 值
        const query = "INSERT INTO names (name, date_added) VALUES (?,?)";
        connection.query(query,[name,dateAdded],(err,result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId) // 从数据库里查询到的数据
        })
      })
      //返回给后端的字段数据
      return {
        id: insertId, // 数据库里的id
        name: name,
        dateAdded: dateAdded
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id){
    id = parseInt(id, 10)
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "DELETE FROM names WHERE id = ?";
        connection.query(query,[id],(err,result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows) // 成功会将传给resolve的值给response
        })
      })
      return response === 1 ? true : false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async updateNameById(name,id){
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "UPDATE names SET name = ? WHERE id = ? ";
        connection.query(query,[name,id],(err,result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows) // 成功会将传给resolve的值给response
        })
      })
      return response === 1 ? true : false
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async searchName(name) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names WHERE name = ?";
        connection.query(query,[name],(err,results) => {
          if (err) reject(new Error(err.message));
          resolve(results) // 从数据库里查询到的数据
        })
      })
      return response // response = [{}]
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService // 导出一个类