import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



function LoginUser() {
    const [user,setUser] = useState({
        email:'',
        password:''
    });
    const navigate = useNavigate();
    const handleNewUser = (e)=>{
      e.preventDefault();
      navigate('/adduser')
    }
    const handleChange = (e)=>{
        e.preventDefault();
        const {name,value} = e.target;
        setUser((prev)=>({...prev,[name]:value}))
    }
    const [error,setError] = useState(null);
    axios.defaults.withCredentials=true;
    const handleSubmit = (e)=>{
      e.preventDefault();
        axios.post('http://localhost:8800/userlogin',user).then((result)=>{
          if(result.data.status){
            navigate('/userdashboard')
          }
          else{
            setError(result.data.Error);
          }
        })
        .catch(error=>{
          setError('Something went wrong. Please try again.'); 
          console.log(error);
      })
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>User Login</h1>
        <label><strong>Email:</strong></label>
        <input type='email' autoComplete='off' name='email' value={user.email} onChange={handleChange} placeholder='Mail'/><br/>
        <label><strong>Password:</strong></label>
        <input type='password' autoComplete='off' name='password' value={user.password} onChange={handleChange} placeholder='password'/><br/>
        <button type='submit'>Submit</button>
      </form>
      <h1>{error && <p>{error}</p>}</h1>
      <button onClick={handleNewUser}>SignUp</button>
    </div>
  )
}

export default LoginUser
