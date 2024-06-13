const mysql = require('mysql')

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Hydtcs@123",
    database:"test1"
})

con.connect((error)=>{
    if (error) {
        console.log(error);
        return;
    }
    console.log("connected with DB");
})

module.exports={con};