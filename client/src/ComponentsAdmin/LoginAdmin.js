import React from 'react'
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Login() {
    const [value,setValue] = useState({
        email:"",
        password:""
      })
      const handleChange =  (e)=>{
        e.preventDefault()
        const {name,value} = e.target;
        setValue((prev)=>({...prev,[name]:value}))
      }
      const navigate = useNavigate();
      axios.defaults.withCredentials = true;
      const [error,setError] = useState(null);
      const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:8800/adminLogin',value)
        .then(result => {
          if(result.data.loginStatus){
            navigate('/dashboard');
          }else{
            setError(result.data.Error);
          }
        })
        .catch(error => console.log(error))
      }
  return (
    <div>
      <div>{error&&error}</div>
        <form onSubmit={handleSubmit}>
        <h1>Login Form Admin</h1>
        <label htmlFor="email"><strong>Email:</strong></label>
        <input type="email" name="email" value={value.email} autoComplete='false' placeholder="Enter your male" onChange={handleChange} /><br/>
        <label htmlFor="password"><strong>password:</strong></label>
        <input type="password" name="password" value={value.password} autoComplete='false' placeholder="Enter your Password" onChange={handleChange} /> <br/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login
