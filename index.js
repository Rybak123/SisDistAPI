const express = require('express')

const routerApi = require('./routes')
const { logError, errorHandler, boomError } = require('./middlewares/error.handler')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send("este es mi premer API - Hola mundo")
})

routerApi(app)

app.use(logError)
app.use(boomError)
app.use(errorHandler)

app.listen(port, () => {
    console.log("El servidor se esta ejecutando.")
})

///////////////////////////////////////////////////////////////////////////////7
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  const mysql = require('mysql');
  const bodyparser = require('body-parser');
  const dotenv = require('dotenv');

  var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: process.env.db_user_name,
    password: process.env.db_password,
    database: process.env.db_name
  });
  
  mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeeded')
    else
    console.log('DB connection failed \n Error :' + JSON.stringify(err,undefined,2));
  })


  //usuarios


