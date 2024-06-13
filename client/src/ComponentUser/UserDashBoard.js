import axios from 'axios';
import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function UserDashBoard() {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/userdashboard/register');
  };
  axios.defaults.withCredentials = true;
  const handleSubmit = ()=>{
    axios.get('http://localhost:8800/logout').then((result)=>{
      if(result.data.status){
        navigate('/userlogin')
      }
    }).catch((error)=>(console.log(error)))
  }
  const handlePolicy = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.get('http://localhost:8800/userPolicies', {
        withCredentials: true, // Ensure credentials are sent
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPolicies(response.data); 
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  };
  const handleUserDetails = (e)=>{
    e.preventDefault();
    navigate('/userprofile')
  }
  return (
    <div>
      <div>
        <h1>Choose Policy</h1>
        <p>
          <p>Home insurance Policy_Number: 1</p>
          <p>Motor insurance Policy_Number: 2</p>
          <p>Travel insurance Policy_Number: 3</p>
          <p> health insurance Policy_Number: 4</p>
          <p>Term insurance Policy_Number: 5</p>
          <p>Fire insurance Policy_Number: 6</p>
          <p> Liability insurance Policy_Number: 7</p>
          <p>Maternity health insurance Policy_Number: 8</p>
          <p>Child plans Policy_Number: 9</p>
        </p>
      </div>
      <ol><button onClick={handleSubmit}>logout</button></ol>
      <button onClick={handleClick}>New Policy</button>
      <button onClick={handlePolicy}>Get My Policies</button>
      <button onClick={handleUserDetails}>My profile</button>

      <div>
        <h2>Your Policies</h2>
        <table className='policys'>
            <thead>
                <tr>
                    <th>Policy Number</th>
                    <th>Insured Party</th>
                    <th>Coverage Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Premium Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {policies && policies.map((policy, id) => (
                    <tr className='policy' key={id}>
                    <td>{policy.policy_Number}</td>
                    <td>{policy.insured_party}</td>
                    <td>{policy.coverage_type}</td>
                    <td>{policy.start_date}</td>
                    <td>{policy.end_date}</td>
                    <td>{policy.premium_amount}</td>
                    <td>{policy.status}</td>
                    </tr>
                ))}
            </tbody>
      </table>
      </div>
    </div>
  );
}

export default UserDashBoard;
