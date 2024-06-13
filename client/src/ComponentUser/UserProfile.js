import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function UserProfile() {
  const [user,setUser] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8800/userdetails');
        console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, []); 
  const navigate = useNavigate();
  const handleClick= (e)=>{
    e.preventDefault();
    navigate('/userdashboard')
  }
  return (
    <div>
      <div>
      {user && user.map((u, id) => (
          <div key={id}>
            <h3 >fname:{u.fname}</h3>
            <h3 >lname:{u.lname}</h3>
            <h3 >email:{u.email}</h3>
          </div>
        ))}
      </div>
      <button onClick={handleClick}>UserDashBoard</button>
    </div>
  )
}

export default UserProfile
