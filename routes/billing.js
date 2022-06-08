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
router.get('/billing', async (req, res) => {
    var mysqlConnection = coneccionDeBaseDeDatos()
    let sql1 = 'SELECT * FROM categorydb'
    let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1)=>{
        if(!err1)
        {
        
          let sql2 = 'SELECT * FROM branddb'
          let query2 = mysqlConnection.query(sql2, (err2, rows2, fields2)=>{
            if(!err2)
            {
    
              let sql3 = 'SELECT * FROM sizedb'
              let query3 = mysqlConnection.query(sql3, (err3, rows3, fields3)=>{
                if(!err3)
                {
                    res.json({
                        rows1:rows1,
                        rows2:rows2,
                        rows3:rows3
                    })
                }
                else
                console.log(err3)
              })
            }
            else
            console.log(err2)
          })
        }
        else
        console.log(err1)
    })
})
router.post('/submitbill', async (req, res) => {
  var mysqlConnection = coneccionDeBaseDeDatos()
    console.log(`\nRequest body = `)
console.log(req.body)
var request1 = req.body.cuerpo


var date_format = new Date();
var transaction_date = date_format.getDate()+ '/' +(parseInt(date_format.getMonth()+1)).toString() + '/'+ date_format.getFullYear()
var transaction_time = date_format.getHours() + ':' + date_format.getMinutes() + ':' + date_format.getSeconds()
var transaction_id = "SHW"+ date_format.getDate() + date_format.getMonth() + date_format.getFullYear() + date_format.getHours() + date_format.getMinutes() + date_format.getSeconds()
let new_req = {};

var item_ids = []

for(i in request1) {
  if(i.includes("itemid")){
    item_ids.push(request1[i])
  }
}
console.log(item_ids)

  for (i in request1){
  if(i.includes("number") || i.includes("total")){
  delete i
  }
  else
  new_req[i] = request1[i]
  }
  
  const data = Object.entries(new_req).reduce((carry, [key, value]) => {
      const [text] = key.split(/\d+/);
      const index = key.substring(text.length) - 1;
      if (!Array.isArray(carry[index])) carry[index] = [];
      carry[index].push(value);
      return carry;
  }, []);

  for (let i = 0; i < data.length; i++) {
    data[i].push(transaction_date);
    data[i].push(transaction_time);
    data[i].push(transaction_id);
    data[i].push(date_format.getDate())
    data[i].push(date_format.getMonth() + 1)
    data[i].push(date_format.getFullYear())
   }
let sql = `INSERT INTO ordersdb(ItemID,ItemName,Category,Brand,Size,Amount,CustomerNumber,TransactionDate,TransactionTime,TransactionID,TDay,TMonth,TYear) VALUES ? `
let query = mysqlConnection.query(sql,[ data], (err, rows, fields)=>{
  if(!err)
  {
  console.log('Successfully inserted values into ordersdb')
 var sql2 = 'DELETE FROM stockdb WHERE ItemID = ?'
  for(j=0;j<item_ids.length;j++){
    var query2 = mysqlConnection.query(sql2,[item_ids[j]], (err2, rows2, fields2)=>{
      if(!err2)
      {
      console.log('Successfully deleted corresponding values from stockdb')
        res.json({
          rows:rows,
          rows2:rows2
        })
      }
      else
      console.log(err2);
    });
  }
  //res.redirect('/orders')
  
  // res.redirect('/orders')
  }
  else
  console.log(err);
})
});
module.exports = router






