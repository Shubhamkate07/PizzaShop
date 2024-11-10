import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    await axios.post('http://127.0.0.1:5000/regi', formData).then((res)=>{
if(res.data==='User Alerdy Exists with this Number.'){
  toast.error('User Alerdy Exists..',{
    position:'top-center'
  });


}else if(res.data==='registration success'){
  toast.success('Register successfully',{
    position:'top-center'
  });
  
}

setFormData({
  name:'',
  phoneNumber:'',
  address:'',
  password:''

})
    }).catch((err)=>{
      console.log(err);
      
    })




    // Add your logic for form submission (e.g., API call) here
  };

  return (
    
    <div className="register-container">
      <ToastContainer />
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      <div>
        <Link to='/'>SignIn</Link>
      </div>
    </div>
  );
};

export default Register;
