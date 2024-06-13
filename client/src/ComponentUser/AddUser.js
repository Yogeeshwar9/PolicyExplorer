import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [values,setValues]=useState({
    email:"",
    password:"",
    fname:"",
    lname:"",
    address:""
  })
  const navigate = useNavigate();
  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:8800/userdata',values).then((result)=>{
      if(result.data.status){
        navigate('/userlogin');
      }else{
        console.log(result.data.error);
      }
    }).catch((error)=>{
      console.log(error);
    });
  }
  const handleChange = (e)=>{
    e.preventDefault();
    const {name,value}=e.target;
    setValues((prev)=>({...prev,[name]:value}))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Enter the Details For Registration</h1>
        <label>Email:</label>
        <input type='email' name='email' placeholder='Enter Your Mail' value={values.email} onChange={handleChange} />
        <br/>
        <label>password:</label>
        <input type='password' name='password' placeholder='Enter Your password' value={values.password} onChange={handleChange} />
        <br/>
        <label>FName:</label>
        <input type='text' name='fname' placeholder='Enter Your Name' value={values.fname} onChange={handleChange} />
        <br/>
        <label>LName:</label>
        <input type='text' name='lname' placeholder='Enter The Date' value={values.lname} onChange={handleChange} />
        <br/>
        <label>Address:</label>
        <input type='text' name='address' placeholder='Enter The Date' value={values.address} onChange={handleChange} />
        <br/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default AddUser
