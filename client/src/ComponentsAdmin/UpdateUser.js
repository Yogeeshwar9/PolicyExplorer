
import React ,{useEffect, useState} from 'react'
import axios from 'axios'
import {useLocation,useNavigate} from 'react-router-dom'
import App from '../App.css'

function UpdateUser() {
    const [policies, setPolicies] = useState({
    policy_Number:"",
    insured_party:"",
    coverage_type:"",
    start_date:"",
    end_date:"",
    premium_amount:0,
    status:""
    })
    const navigate = useNavigate()
    const location = useLocation()
    const policyId = location.pathname.split("/")[2]
    const handleChange = (e) => {
      e.preventDefault();
      setPolicies((prev)=>({...prev,[e.target.name]:e.target.value}));
    };
    useEffect(() => {
      const fetchData = async () => {
          try {
              const res = await axios.get(`http://localhost:8800/policy/${policyId}`);
              if (res.data && res.data.length > 0) {
                  setPolicies(res.data[0]);
              } else {
                  console.log('Empty response or no data found');
              }
          } catch (error) {
              console.log(error);
          }
      };
      fetchData();
  }, [policyId]);
  
  
  
    const handleClick = async (e)=>{
      e.preventDefault();
      try {
          await axios.put(`http://localhost:8800/policy/${policyId}`,policies)
          navigate('/dashboard/userdetails')
      } catch (error) {
          console.log(error);
      }
    }
  return (
    <>
      <h1>Update The details</h1>
      <label htmlFor='policy_Number'>Policy Number:</label>
      <input type='number' placeholder='Policy Number' value={policies.policy_Number} onChange={handleChange} name='policy_Number' />
      <br/>
      <label htmlFor='insured_party'>Insured Party:</label>
      <input type='text' placeholder='Insured Party' value={policies.insured_party} onChange={handleChange} name='insured_party' />
      <br/>
      <label htmlFor='coverage_type'>Coverage Type:</label>
      <input type='text' placeholder='Coverage Type' value={policies.coverage_type} onChange={handleChange} name='coverage_type' />
      <br/>
      <label htmlFor='start_date'>Start Date:</label>
      <input type='date' placeholder='Start Date' value={policies.start_date} onChange={handleChange} name='start_date' />
      <br/>
      <label htmlFor='end_date'>End Date:</label>
      <input type='date' placeholder='End Date' value={policies.end_date} onChange={handleChange} name='end_date' />
      <br/>
      <label htmlFor='premium_amount'>Premium Amount:</label>
      <input type='number' placeholder='Premium Amount' value={policies.premium_amount} onChange={handleChange} name='premium_amount' />
      <br/>
      <label htmlFor='status'>Status:</label>
      <input type='text' placeholder='Status' value={policies.status} onChange={handleChange} name='status' />
      <br/>
      <button className='formButton' onClick={handleClick}>Update</button>
    </>
  )
}

export default UpdateUser
