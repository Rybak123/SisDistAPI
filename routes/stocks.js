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
router.get('/viewstocks', async (req, res) => {
    var mysqlConnection = coneccionDeBaseDeDatos()

let sql = 'SELECT * FROM stockdb ORDER BY TYear DESC,Tmonth DESC, TDay DESC,StockTime DESC';

let query = mysqlConnection.query(sql, (err, rows, fields)=>{
  if(!err){
    let sql1 = 'SELECT * FROM branddb' 
    let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1)=>{
      if(!err1){
        let sql2 = 'SELECT * FROM categorydb'
        let query2 = mysqlConnection.query(sql2, (err2, rows2, fields2)=>{
          if(!err2){
            res.json({
                rows:rows,
                rows1:rows1,
                rows2:rows2
            })
            }
          else
          console.log(err2)
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

router.post('/stocks_query', async (req, res) => {
    var mysqlConnection = coneccionDeBaseDeDatos()
    let sql = 'SELECT * FROM stockdb ORDER BY TYear DESC,Tmonth DESC, TDay DESC,StockTime DESC';
    let query = mysqlConnection.query(sql, (err, rows, fields)=>{
        if(!err){
          let sql1 = 'SELECT * FROM branddb' 
          let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1)=>{
            if(!err1){
              let sql2 = 'SELECT * FROM categorydb'
              let query2 = mysqlConnection.query(sql2, (err2, rows2, fields2)=>{
                if(!err2){
                  var selected_item = req.body['exampleRadios']
                  if(selected_item == 'brand'){
                    var brand_name = req.body['selected_brand']
                    let sql3 = `SELECT * FROM stockdb WHERE Brand='${brand_name}'`
                    let query3 = mysqlConnection.query(sql3, (err3, rows3, fields3)=>{
                      if(!err3){
                        res.json({
                            rows:rows,
                            rows1:rows1,
                            rows2:rows2,
                            rows3:rows3
                        })
                      } 
                      else
                      console.log(err3)
                    })
                  }
    
                  if(selected_item == 'category'){
                    var category_name = req.body['selected_category']
                    let sql3 = `SELECT * FROM stockdb WHERE Category='${category_name}'`
                    let query3 = mysqlConnection.query(sql3, (err3, rows3, fields3)=>{
                      if(!err3){
                        res.json({
                            rows:rows,
                            rows1:rows1,
                            rows2:rows2,
                            rows3:rows3
                        })
                      } 
                      else
                      console.log(err3)
                    })
                  }
                }
                else
                console.log(err2)
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


router.get('/stock_filter_query', async (req, res) => {
    var mysqlConnection = coneccionDeBaseDeDatos()
    var filter_type = req.body['exampleRadios1']
    if(filter_type == 'brand'){
      let sql = 'SELECT Brand,count(*) AS Count,SUM(Amount) AS Amount FROM stockdb GROUP BY Brand'
      let query = mysqlConnection.query(sql, (err, rows, fields) => {
        if(!err)
        {
          let sql1 = 'SELECT count(*) AS Count FROM stockdb'
          let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1) => {
            if(!err1)
            {
                res.json({
                    rows:rows,
                    rows1:rows1,
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
    if(filter_type == 'category'){
      let sql = 'SELECT Category,count(*) AS Count,SUM(Amount) AS Amount FROM stockdb GROUP BY Category'
      let query = mysqlConnection.query(sql, (err, rows, fields) => {
        if(!err)
        {
          let sql1 = 'SELECT count(*) AS Count FROM stockdb'
          let query1 = mysqlConnection.query(sql1, (err1, rows1, fields1) => {
            if(!err1)
            {
                res.json({
                    rows:rows,
                    rows1:rows1,
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

router.get('/stocks', async (req, res) => {
    let sql1 = 'SELECT * FROM categorydb'
    var mysqlConnection = coneccionDeBaseDeDatos()
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

router.post('/submitStocks', async (req, res) => {
    var request1 = req.body.cuerpo
    var mysqlConnection = coneccionDeBaseDeDatos()
    var date_format = new Date();
    var transaction_date = date_format.getDate()+ '/'+ (parseInt(date_format.getMonth()+1)).toString() +'/'+date_format.getFullYear()
    console.log((parseInt(date_format.getMonth()+1)).toString())
    var transaction_time = date_format.getHours() + ':' + date_format.getMinutes() + ':' + date_format.getSeconds()
    let new_req = {};

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
        data[i].push(date_format.getDate())
        data[i].push(date_format.getMonth() + 1)
        data[i].push(date_format.getFullYear())
       }
      

    let sql = `INSERT INTO stockdb(ItemID,ItemName,Category,Brand,Size,Amount,StockDate,StockTime,TDay,TMonth,TYear) VALUES ? `
    let query = mysqlConnection.query(sql,[ data], (err, rows, fields)=>{
      if(!err)
      {
      console.log('Successfully inserted values')
        res.json({
          rows:rows
        })
      }
      else
      console.log(err);
    });

})

router.post('/deletestock', async (req, res) => {
    var mysqlConnection = coneccionDeBaseDeDatos()
    console.log('deleteitem called')
    var deleteid = req.body.deleteid
    let sql = 'DELETE FROM stockdb WHERE ItemID = ?'
    let query = mysqlConnection.query(sql,[ deleteid], (err, rows, fields)=>{
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
module.exports = router

