import React, { useContext, useState } from 'react';
import './Login.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { UserContext } from '../App';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {

    const usenavi=useNavigate(); 
    const { user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async(e) => {
        e.preventDefault();
        const AdminDat = {
            username: username,
            password: password
        };

        console.log(AdminDat);

        await axios.post('http://127.0.0.1:5000/admi', AdminDat)
        .then((res) => {
            if (res.data === 'you are not authentic user') {
                console.log('you are not authentic user');
                toast.error('You are not an authentic user');
            } else if (res.data === 'Incorrect password') {
                console.log('Incorrect password');
                toast.error('Incorrect password');
            } else if (res.data === 'access') {
                console.log('success');
                toast.success('Login successful');
                usenavi('/admindata');
            }
        })
        .catch((err) => {
            toast.error('Error connecting to the server');
            console.log(err);
        });
        
    };
    return (
        <div className="login-container">
           <ToastContainer />
                <div className="login-form">
                    <h2>Admin Login</h2>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="button" onClick={handleLogin}>Login</button>
                    <div style={{ paddingTop: '16px', textDecoration: 'none' }}>
                        <Link to="/">User</Link>
                    </div>
                </div>
        
        </div>
    );
};

export default AdminLogin;
