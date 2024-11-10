import React from "react";
import { Link } from "react-router-dom";
import './Nav.css';
const Nav = () => {
    return (
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">PizzaShop</Link>
          <ul className="nav-menu">
            {/* <li className="nav-item">
              <Link to="/home" className="nav-links">Home</Link>
            </li> */}
            <li className="nav-item">
              <Link to="/register" className="nav-links">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin" className="nav-links">Admin</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-links">User</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
  
  export default Nav;