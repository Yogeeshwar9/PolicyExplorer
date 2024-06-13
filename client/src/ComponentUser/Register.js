import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [policies, setPolicies] = useState({
        policy_Number:'',
        insured_party:"",
        coverage_type:"",
        start_date:new Date().toISOString().split('T')[0],
        end_date:new Date().toISOString().split('T')[0],
        premium_amount:''
        })
        const navigate = useNavigate()
    
        const handleChange = (e) => {
          e.preventDefault();
          const { name, value } = e.target;
          setPolicies((prev) => ({
            ...prev,
            [name]: value,
          }));
        };
        axios.defaults.withCredentials = true;
        const handleClick = async (e)=>{
          e.preventDefault();
          try {
              await axios.post('http://localhost:8800/policy/',policies)
              navigate('/userdashboard')
          } catch (error) {
              console.log(error);
          }
        }
      return (
        <>
          <div className='form'>
            <h1>Add The User details</h1>
            <label htmlFor='policy_Number'>Policy Number:</label>
            <input type='number' placeholder='Policy Number' value={policies.policy_Number} onChange={handleChange} name='policy_Number' /><br/>
            <label htmlFor='insured_party'>Name:</label>
            <input type='text' placeholder='Insured Party' value={policies.insured_party} onChange={handleChange} name='insured_party' /><br/>
            <label htmlFor='coverage_type'>Coverage Type:</label>
            <input type='text' placeholder='Coverage Type' value={policies.coverage_type} onChange={handleChange} name='coverage_type' /><br/>
            <label htmlFor='start_date'>Start Date:</label>
            <input type='date' placeholder='Start Date' value={policies.start_date} onChange={handleChange} name='start_date' /><br/>
            <label htmlFor='end_date'>End Date:</label>
            <input type='date' placeholder='End Date' value={policies.end_date} onChange={handleChange} name='end_date' /><br/>
            <label htmlFor='premium_amount'>Premium Amount:</label>
            <input type='number' placeholder='Premium Amount' value={policies.premium_amount} onChange={handleChange} name='premium_amount' /><br/>
            <button className='formButton' onClick={handleClick}>ADD</button>
          </div>

        </>
    )
}

export default Register
