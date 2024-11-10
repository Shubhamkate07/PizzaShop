
import './App.css';


import Register from './Components/Register';
import Home from './Components/Home.js';
import Login from './Components/Login.js';


import {BrowserRouter, Routes,Route} from 'react-router-dom';

import { createContext, useState } from 'react';
import Admin from './Components/Admin.js';
import Nav from './Components/Nav.js';
import AdminLogin from './Components/AdminLogin.js';

export   const UserContext= createContext(null);
function App() {

const [user, setuser]= useState(false);

  return (
    <div className="App">


    <BrowserRouter>

    <UserContext.Provider value={{user:user, setuser:setuser }}>
    <Nav/>
      <Routes>
       <Route  path='/' element={<Login/>}/>
       <Route  path='/admin' element={<AdminLogin/>}/>
       <Route  path='/admindata' element={<Admin/>}/>
       <Route  path='/home' element={<Home/>}/>
       <Route  path='/register' element={<Register/>}/>
      </Routes>
     </UserContext.Provider>
     </BrowserRouter>


    </div>
  );
}

export default App;
