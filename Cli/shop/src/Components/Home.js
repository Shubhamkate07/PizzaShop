import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import '../Components/Home.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { user, setuser } = useContext(UserContext);


  const [resjsondata, setresjsondata]=useState("");

  const location = useLocation();
  const { username,pass } = location.state;


  const [pizzaTypes, setPizzaTypes] = useState({
    pizza1: '',
    pizza2: '',
    pizza3: '',
    pizza4: '',
    address:''
  });

  const prices = {
    pizza1: 10,
    pizza2: 12,
    pizza3: 15,
    pizza4: 20,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPizzaTypes({
      ...pizzaTypes,
      [name]: value,
    });
  };

  const calculateTotalCost = () => {
    // const { pizza1, pizza2, pizza3, pizza4 } = pizzaTypes;
    return (
      (parseInt(pizzaTypes.pizza1) || 0) * prices.pizza1 +
      (parseInt(pizzaTypes.pizza2) || 0) * prices.pizza2 +
      (parseInt(pizzaTypes.pizza3) || 0) * prices.pizza3 +
      (parseInt(pizzaTypes.pizza4) || 0) * prices.pizza4
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Pizza Types:', pizzaTypes);
    setuser(pizzaTypes);

    await axios.post('https://pizzashop-777.onrender.com/order', pizzaTypes).then((res) => {
      console.log(res.data); // print  res.send("order send but why on console and not on page now possible"); on console
      setresjsondata(res.data);// print this  res.send("order send but why on console and not on page now possible");on page as well res.data set data sending  from backend to frontend from /order route
    }).catch((err) => {
      console.log('err', err);
    });

    notify('Thank you! Order sent, please wait for some time.');

    setPizzaTypes({
      pizza1: '',
      pizza2: '',
      pizza3: '',
      pizza4: '',
      address:''
    });
  };

  const notify = (msg) => {
    toast(msg, {
      position: 'top-center',
    });
  };

  return (
    <div className="container">
      <h1>Welcome, {username}! Your pass is {pass}</h1>
      <div className="form-container">
        <h2>What pizza would you like to order?</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="pizza1">Pizza Type 1:</label>
            <input
              type="number"
              id="pizza1"
              name="pizza1"
              value={pizzaTypes.pizza1}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="pizza2">Pizza Type 2:</label>
            <input
              type="number"
              id="pizza2"
              name="pizza2"
              value={pizzaTypes.pizza2}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="pizza3">Pizza Type 3:</label>
            <input
              type="number"
              id="pizza3"
              name="pizza3"
              value={pizzaTypes.pizza3}
              onChange={handleChange}
              min="0"
            />
          </div>
          <div>
            <label htmlFor="pizza4">Pizza Type 4:</label>
            <input
              type="number"
              id="pizza4"
              name="pizza4"
              value={pizzaTypes.pizza4}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={pizzaTypes.address}
              onChange={handleChange}
             
            />
          </div>
          <div>
            <strong>Total Cost: ${calculateTotalCost()}</strong>
          </div>
          <button type="submit">Order Now</button>
        </form>

        <p>{resjsondata}</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
