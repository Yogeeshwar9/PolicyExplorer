const { con } = require('../model/db.js')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')


const adminLogin = (req, res) => {
    console.log(req.body)
    const sql = 'select * from admin where email=? and password = ?'
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            return res.json({ loginStatus: false, Error: "Query Error" })
        }
        if (result.length > 0) {
            const email = result[0].email;
            const user_id = result[0].id;
            const token = jwt.sign({ role: "admin", email: email, user_id: user_id }, "jwt_secret_key", { expiresIn: '1d' });
            console.log(result[0]);
            res.cookie('token', token)
            return res.json({ loginStatus: true })
        } else {
            return res.json({ loginStatus: false, Error: "Wrong Email or password" })
        }
    })
}

const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true });
}

const userlogin = (req, res) => {
    const sql = 'select * from user where email=? and password=?'
    con.query(sql, [req.body.email, req.body.password], (error, result) => {
        if (error) {
            return res.json({ status: false, Error: "Error in query" })
        }
        if (result.length > 0) {
            const email = result[0].email;
            const user_id = result[0].id;
            const token = jwt.sign({ role: "user", email: email, user_id: user_id }, "jwt_secret_key", { expiresIn: "1d" });
            console.log(result[0]);
            res.cookie('token', token)
            return res.json({ status: true })
        } else {
            return res.json({ status: false, Error: "Wrong Email or password" })
        }
    })
}

const policy = (req, res) => {

    const policy_Number = req.body.policy_Number;
    const insured_party = req.body.insured_party;
    const coverage_type = req.body.coverage_type;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const premium_amount = req.body.premium_amount;

    const token = req.cookies.token;
    console.log("token",token);
    const secretKey = 'jwt_secret_key';

    jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
        console.log('Token verification failed:', err.message);
    } else {
        console.log('Decoded payload:', decoded.user_id);
        const user_id = decoded.user_id;
        const q = 'insert into policy(`policy_Number`,`insured_party`,`coverage_type`,`start_date`,`end_date`,`premium_amount`) values(?,?,?,?,?,?)'
        con.query(q, [policy_Number, insured_party, coverage_type, start_date, end_date, premium_amount], (error, result) => {
            if (error) {
                console.log(error);
                return;
            }
            const policy_id= result.insertId; // Access the auto-generated primary key
            console.log('Inserted Policy ID:', policy_id);
            const qu = 'insert into user_policy(policy_id,user_id) values(?,?)'
            con.query(qu,[policy_id,user_id],(error,result)=>{
                if(error){
                    console.log(error);
                }
                else{
                    res.send("Data posted");
                }
            })
        }); 
    }
    });
}

const userdata = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const address = req.body.address;

    const q = 'insert into user (email,password,fname,lname,address)values(?,?,?,?,?)';
    con.query(q, [email, password, fname, lname, address], (error, result) => {
        if (error) {
            return res.json({ status: false, error: error })
        }
        else {
            return res.json({ status: true });
        }
    });
}

const userPolicies = (req, res) => {
    const token = req.cookies.token;
    console.log(token);
    const secretKey = 'jwt_secret_key';
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log('Token verification failed:', err.message);
        }else{
            const u_id = decoded.user_id;
            const q = 'SELECT p.* FROM user u JOIN user_policy up ON u.id = up.user_id JOIN policy p ON up.policy_id = p.id WHERE u.id = ?;'
            con.query(q,[u_id],(error,result)=>{
                if(error){
                    return res.json({error:error});
                }
                else{
                    return res.json(result);
                }
            })
        }
    })

}

const adminPolicy = (req,res)=>{

    const q='select * from policy'
    con.query(q,(error,result)=>{
        if(error){
            console.log(error);
            return;
        }
        res.send(result);
    })
}

const deletePolicy = (req,res)=>{
    const id = req.params.id;
    const q = 'delete from policy where id=? '
    con.query(q,[id],(error,result)=>{
        if(error){
            res.status(401).json({error:error});
        }
        else{
            res.send("Deleted")
        }
    })
}

const policyById = (req,res)=>{
    const id = req.params.id;
    const q = 'select * from policy where id=?'
    con.query(q,[id],(error,result)=>{
        if(error){
            console.log(error);
            return;
        }
        res.send(result);
    })
}

const putById = (req,res)=>{
    const id = req.params.id;
    const policy_Number = req.body.policy_Number;
    const insured_party = req.body.insured_party;
    const coverage_type = req.body.coverage_type;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const premium_amount = req.body.premium_amount;
    const status = req.body.status;

    const q = 'update policy set policy_Number=?,insured_party=?,coverage_type=?,start_date=?,end_date=?,premium_amount=?,status=? where id=?'
    con.query(q,[policy_Number,insured_party,coverage_type,start_date,end_date,premium_amount,status,id],(error,result)=>{
        if(error){
            console.log(error);
            return;
        }
        res.send("Data Updated");
    })
}

const userDetails = (req,res)=>{
    const token = req.cookies.token;
    const secretKey = 'jwt_secret_key';
    jwt.verify(token,secretKey,(error,decoded)=>{
        if(error){
            console.log('Token verification failed:', err.message);
            return;
        }
        else{
            const id = decoded.user_id;
            const q='select * from user where id=?'
            con.query(q,[id],(error,result)=>{
                if(error){
                    console.log(error);
                    return;
                }else{
                    return res.json(result);
                }
            })
        }
    })
}

module.exports = { 
    adminLogin: adminLogin, 
    logout: logout, 
    userlogin: userlogin, 
    policy: policy, 
    userdata: userdata,
    userPolicies:userPolicies, 
    adminPolicy:adminPolicy,
    deletePolicy:deletePolicy,
    policyById:policyById,
    putById:putById,
    userDetails:userDetails
}