import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  axios from 'axios'
import App from '../App.css';
function DashBoard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleSubmit = ()=>{
    axios.get('http://localhost:8800/logout').then((result)=>{
      if(result.data.status){
        navigate('/adminlogin')
      }
    }).catch((error)=>(console.log(error)))
  }
  const handleUsers = ()=>{
    navigate('/dashboard/userdetails')
  }
  return (
    <div className='adminBtn'>
      <p>
        <button onClick={handleSubmit} className='lbtn' >Logout</button>
        <button onClick={handleUsers} className='ubtn'>Get User details</button>
      </p>
    </div>
  )
}

export default DashBoard
