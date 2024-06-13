import React from 'react'
import { useNavigate } from 'react-router-dom'
import App from './App.css';
function Home() {
    const navigate = useNavigate();
    const handleAdmin = ()=>{
        navigate('/adminlogin');
    }
    const handleUser = ()=>{
        navigate('/userlogin')
    }
  return (
    <div>
      <h1>Login As:</h1>
      <div>
        <button className='home' onClick={handleUser}>User</button>
        <button className='home' onClick={handleAdmin}>Admin</button>
    </div>
    </div>
  )
}

export default Home
