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
router.get('/sales_query_filter', async (req, res) => {
    var time_type = req.body['exampleRadios']

if (time_type == 'month'){

  var month= req.body['selected_month']
  var year = req.body['selected_year']

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
  var month_name = monthNames[parseInt(month-1)]
  console.log(month_name)
  if (req.body['exampleRadios1'] == 'all'){
    
    let sql = `SELECT TransactionDate,count(*) as Count,SUM(Amount) as Amount FROM ordersdb WHERE TMonth = ${month} AND TYear = ${year} GROUP BY TransactionDate`;
    let query = mysqlConnection.query(sql, (err, rows, fields) => {
      if(!err)
      {
        let sql1 = `SELECT SUM(Amount) as Amount,count(*) AS Count FROM ordersdb WHERE TMonth = ${month} AND TYear = ${year}`
        let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1) => {
          if(!err1)
          {
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
      console.log(err)
  })
  }

  if (req.body['exampleRadios1'] == 'brand'){
    
    let sql = `SELECT Brand,count(*) AS Count,SUM(Amount) as Amount FROM ordersdb WHERE TMonth=${month} AND TYear = ${year} GROUP BY Brand`;
    let query = mysqlConnection.query(sql, (err, rows, fields) => {
      if(!err)
      {
        let sql1 = `SELECT SUM(Amount) as Amount,count(*) AS Count FROM ordersdb WHERE TMonth = ${month} AND TYear = ${year}`
        let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1) => {
          if(!err1)
          {
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
      console.log(err)
  })
  }

  if (req.body['exampleRadios1'] == 'category'){
    
    let sql = `SELECT Category,count(*) AS Count,SUM(Amount) as Amount FROM ordersdb WHERE TMonth=${month} AND TYear = ${year} GROUP BY Category`;
    let query = mysqlConnection.query(sql, (err, rows, fields) => {
      if(!err)
      {
        let sql1 = `SELECT SUM(Amount) as Amount,count(*) AS Count FROM ordersdb WHERE TMonth = ${month} AND TYear = ${year}`
        let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1) => {
          if(!err1)
          {
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
      console.log(err)
  })
  }
}

if (time_type == 'year')
  var year= req.body['selected_year']

  if (req.body['exampleRadios1'] == 'all'){
    
    let sql = `SELECT TMonth,count(*) as Count,SUM(Amount) as Amount FROM ordersdb WHERE TYear = ${year} GROUP BY TMonth`;
    let query = mysqlConnection.query(sql, (err, rows, fields) => {
      if(!err)
      {
        let sql1 = `SELECT SUM(Amount) as Amount,count(*) AS Count FROM ordersdb WHERE TYear = ${year}`
        let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1) => {
          if(!err1)
          {
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
      console.log(err)
  })
  }

  if (req.body['exampleRadios1'] == 'brand'){
    
    let sql = `SELECT Brand,count(*) AS Count,SUM(Amount) as Amount FROM ordersdb WHERE TYear = ${year} GROUP BY Brand`;
    let query = mysqlConnection.query(sql, (err, rows, fields) => {
      if(!err)
      {
        let sql1 = `SELECT SUM(Amount) as Amount,count(*) AS Count FROM ordersdb WHERE TYear = ${year}`
        let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1) => {
          if(!err1)
          {
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
      console.log(err)
  })
  }

  if (req.body['exampleRadios1'] == 'category'){
    
    let sql = `SELECT Category,count(*) AS Count,SUM(Amount) as Amount FROM ordersdb WHERE TYear = ${year} GROUP BY Category`;
    let query = mysqlConnection.query(sql, (err, rows, fields) => {
      if(!err)
      {
        let sql1 = `SELECT SUM(Amount) as Amount,count(*) AS Count FROM ordersdb WHERE TYear = ${year}`
        let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1) => {
          if(!err1)
          {
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
      console.log(err)
  })
}
})

module.exports = router



    


