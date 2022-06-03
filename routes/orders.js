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
router.get('/orders', async (req, res) => {
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

router.post('/orders_query', async (req, res) => {
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
router.post('/deleteitem', async (req, res) => {
    var mysqlConnection = coneccionDeBaseDeDatos()
    console.log(req)

    var deleteid = req.body.deleteid
    let sql = 'DELETE FROM ordersdb WHERE ItemID = ?'
    let query = mysqlConnection.query(sql,[deleteid], (err, rows, fields)=>{
      if(!err)
      {
      console.log('Successfully deleted a value')
      
      res.json({
        rows:rows
      })
      }
      else
      console.log(err);
    });

})
router.get('/orderIndex', async (req, res) => {
    var mysqlConnection = coneccionDeBaseDeDatos()
    let sql1 = 'SELECT SUM(Amount) AS TotalItemsOrdered FROM ordersdb';

    let query1= mysqlConnection.query(sql1, (err1, rows1, fields1)=>{
      if(!err1){
      console.log('Fetched total amount from ordersdb')
      total_sales = rows1
      console.log(typeof(rows1))

      let sql2 = 'SELECT COUNT(ItemID) AS NumberOfProducts FROM ordersdb';

      let query2= mysqlConnection.query(sql2, (err2, rows2, fields2)=>{
        if(!err2){

        ord_num = rows2
        console.log('Fetched total no. of orders from ordersdb')

        let sql3 = 'SELECT COUNT(ItemID) AS NumberOfProducts FROM stockdb';

        let query3= mysqlConnection.query(sql3, (err3, rows3, fields3)=>{
        if(!err3){
        console.log('Fetched total no. of stocks from stockdb')
        stock_num = rows3
        let sql4 = 'SELECT SUM(Amount) AS TotalItemsOrdered FROM stockdb';
        let query4= mysqlConnection.query(sql4, (err4, rows4, fields4)=>{
          if(!err3){
            total_stock = rows4
            res.json({
                rows1:rows1,
                rows2:rows2,
                rows3:rows3,
                rows4:rows4,
            })
          }
          else
          console.log(err4);
       
        });
      }
      else
      console.log(err3);
    });

        }
        else
        console.log(err2);
      });


      }
      else
      console.log(err1);
    });

})


module.exports = router


