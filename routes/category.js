const express = require('express')

const StudentsService = require('../services/students.service')
const validateHandler = require('../middlewares/validate.handler')
const { createStudentSchema, updateStudentSchema, getStudentSchema } = require('../schemas/students.schema')

const router = express.Router()
const service = new StudentsService()
const mysql = require('mysql');



function coneccionDeBaseDeDatos(){
    var mysqlConnection = mysql.createConnection({
        host:'localhost',
        user: process.env.db_user_name,
        password: process.env.db_password,
        database: process.env.db_name
      });
      
      mysqlConnection.connect((err)=>{
        if(!err)
        {
            console.log('DB connection succeeded');
        }
        else
        console.log('DB connection failed \n Error :' + JSON.stringify(err,undefined,2));
      })
      return mysqlConnection;
}
router.post('/addcategory', async (req, res) => {
    var mysqlConnection = coneccionDeBaseDeDatos()
    let sql = `INSERT INTO categorydb(Category) VALUES ('${req.body.new}') `
    let query = mysqlConnection.query(sql, (err, rows, fields) => {
      if(!err)
      {
        res.json({
            rows:rows
        })
      }
      else
      console.log(err)
      })
})
router.get('/categories', async (req, res) => {
    var mysqlConnection = coneccionDeBaseDeDatos()
    let sql1 = 'SELECT * FROM categorydb'
    let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1)=>{
      if(!err1)
      {
        res.json({
            rows1:rows1
        })
      }
      else
      console.log(err1)
  })
})
router.post('/deletecategory', async (req, res) => {
  var mysqlConnection = coneccionDeBaseDeDatos()
    console.log('deletecategory called')
    var deleteid = req.body.deleteid
    let sql = 'DELETE FROM categorydb WHERE Category = ?'
    let query = mysqlConnection.query(sql,[ deleteid], (err, rows, fields)=>{
    if(!err)
    {
    console.log('Successfully deleted a category')
    res.json({
      rows:rows
    })
    
    }
    else
    console.log(err);
    });

})

module.exports = router

