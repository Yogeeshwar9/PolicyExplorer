const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const morgan = require('morgan')
const app = express();
const port = 8800
const { Router } =require('./routes/rout.js');
const {con} = require('./model/db.js')
const cookieParser = require('cookie-parser')

app.use(cors({
    origin:["http://localhost:3000","http://localhost:5173"],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(Router)

app.listen(port,(error)=>{
    console.log(`Server is running on http://localhost:${port}`);
})

