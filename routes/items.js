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
router.post('/fetchitem', async (req, res) => {
    var mysqlConnection = coneccionDeBaseDeDatos()
    item_id = req.body.itemid;
    console.log(req)
    console.log(req)
    console.log(req)
    let sql = 'SELECT * FROM stockdb WHERE ItemID = ?'
    let query = mysqlConnection.query(sql, [item_id], (err, rows, fields)=>{
      if(!err)
      {
        res.json({
            rows:rows
        })
      }
      else
      console.log(err);
    });
})

module.exports = router



    