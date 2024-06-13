
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginAdmin from './ComponentsAdmin/LoginAdmin'
import DashBoard from './ComponentsAdmin/DashBoard';
import Home from './Home';
import LoginUser from './ComponentUser/LoginUser';
import UserDashBoard from './ComponentUser/UserDashBoard';
import AddUser from './ComponentUser/AddUser';
import Register from './ComponentUser/Register';
import UserDetails from './ComponentsAdmin/UserDetails';
import UpdateUser from './ComponentsAdmin/UpdateUser';
import UserProfile from './ComponentUser/UserProfile';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path={'/adminlogin' } element={<LoginAdmin/>}/>
          <Route path={'/userlogin' } element={<LoginUser/>}/>
          <Route path='/adduser' element={<AddUser/>} />
          <Route path='/userdashboard' element={<UserDashBoard/>} />
          <Route path='/userdashboard/register' element={<Register/>} />
          <Route path='/dashboard' element = {<DashBoard/>} />
          <Route path='/dashboard/userdetails'element = {<UserDetails/>}/>
          <Route path='/update/:id' element ={<UpdateUser/>}/>
          <Route path='/userprofile' element = {<UserProfile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
