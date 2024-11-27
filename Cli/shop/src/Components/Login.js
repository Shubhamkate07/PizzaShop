import React, { useContext, useState } from 'react';
import './Login.css'; // Import the CSS file
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import { UserContext } from '../App';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const usenavi = useNavigate();
    const { user, setuser } = useContext(UserContext);
    const [credentials, setCredentials] = useState({ username: '', password: '', phoneNumber: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleLogin = async () => {
        try {
          await axios.post('https://pizzashop-2.onrender.com/log', credentials).then((res)=>{
                if(res.data==='User Not found Please register..'){
toast.error('User Not found Please register..',{
    position:'top-center'
})
                }else if(res.data==='Invalid username password or phonenumber'){
                    toast.error('Invalid username password or phonenumber',{
                        position:'top-center'
                    }) }else if(res.data==='login success'){

                        setuser(credentials);
                        usenavi('/home', { state: { username: credentials.username, pass: credentials.password } });
                        
                        toast.success('login success',{
                            position:'top-center'
                        }) 

                    }else{
                        toast.success('Something went wrong try again!',{
                            position:'top-center'
                        })
                    }
            })

           
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="login-container">
             <ToastContainer />
            <div className="login-form">
                <h2>User Login</h2>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={credentials.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" onClick={handleLogin}>Login</button>
                <div style={{ paddingTop: '16px' }}>
                    <Link to="/admin">Admin</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
