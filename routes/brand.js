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
router.post('/addbrand', async (req, res) => {
    var mysqlConnection = coneccionDeBaseDeDatos()
    let sql = `INSERT INTO branddb(Brand) VALUES ('${req.body.new}') `
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
router.get('/brands', async (req, res) => {
    var mysqlConnection = coneccionDeBaseDeDatos()
    let sql2 = 'SELECT * FROM branddb'
    let query2 = mysqlConnection.query(sql2, (err2, rows2, fields2)=>{
      if(!err2)
      {
        res.json({
            rows2:rows2
        })
      }
      else
      console.log(err2)
  })
})

router.post('/deletebrand', async (req, res) => {
  var mysqlConnection = coneccionDeBaseDeDatos()
    console.log('deletebrand called')
    var deleteid = req.body.deleteid
    let sql = 'DELETE FROM branddb WHERE Brand = ?'
    let query = mysqlConnection.query(sql,[ deleteid], (err, rows, fields)=>{
      if(!err)
      {
      console.log('Successfully deleted a brand')
      res.json({
        rows:rows
      })
      
      }
      else
      console.log(err);
    });
})

module.exports = router





