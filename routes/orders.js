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
router.get('/', async (req, res) => {

    
    var mysqlConnection = coneccionDeBaseDeDatos()

    let sql = 'SELECT TransactionID,SUM(Amount) as Amount,TransactionDate,TransactionTime FROM ordersdb GROUP BY TransactionID';

    let query = mysqlConnection.query(sql, (err, rows, fields)=>{
    if(!err){
        let sql1 = 'SELECT * FROM ordersdb'
        let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1)=>{
        if(!err1){
            res.json({
                rows:rows,
                rows1:rows1
            })
        }
        else
            console.log(err1)
        })
    
    }
    else
    console.log(err);
    });
})

router.get('/ordersQuery', async (req, res) => {

    
    var mysqlConnection = coneccionDeBaseDeDatos()

    var time_type = req.body['exampleRadios']
    if (time_type == 'month'){
    var month= req.body['selected_month']
    var year = req.body['selected_year']

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    var month_name = monthNames[parseInt(month-1)]

    let sql = `SELECT TransactionID,SUM(Amount) as Amount,TransactionDate,TransactionTime FROM ordersdb WHERE TMonth = ${month} AND TYear = ${year} GROUP BY TransactionID`

    let query = mysqlConnection.query(sql, (err, rows, fields)=>{
        if(!err){
        let sql1 = 'SELECT * FROM ordersdb'
        let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1)=>{
            if(!err1){
                res.json({
                    rows:rows,
                    rows1:rows1
                })
            }
            else
            console.log(err1)
        })
        
    }
        else
        console.log(err);
    });
    }

    if (time_type == 'year'){
    
    var year = req.body['selected_year']

    let sql = `SELECT TransactionID,SUM(Amount) as Amount,TransactionDate,TransactionTime FROM ordersdb WHERE TYear = ${year} GROUP BY TransactionID`

    let query = mysqlConnection.query(sql, (err, rows, fields)=>{
        if(!err){
        let sql1 = 'SELECT * FROM ordersdb'
        let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1)=>{
            if(!err1){
                res.json({
                    rows:rows,
                    rows1:rows1
                })
            }
            else
            console.log(err1)
        })
        
    }
        else
        console.log(err);
    });
    }
})
router.get('/deleteOrder', async (req, res) => {
    console.log('deleteitem called')
    var deleteid = req.body.deleteid
    let sql = 'DELETE FROM ordersdb WHERE ItemID = ?'
    let query = mysqlConnection.query(sql,[ deleteid], (err, rows, fields)=>{
      if(!err)
      {
      console.log('Successfully deleted a value')
      
      
      }
      else
      console.log(err);
    });

})

module.exports = router


