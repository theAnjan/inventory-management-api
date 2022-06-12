import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.component.css'

export const Header = (props) => {
  let navigate = useNavigate();
  const logout = () => {
    // clear local storage
    // redirect to login

    localStorage.clear();
    navigate('/');
  }

  let content = props.isLoggedIn
    ? <ul className="nav_list">
      <li className="nav_item">
        <Link to="/home">Home </Link>
      </li>
      <li className="nav_item">
        <Link to="/about">About</Link>
      </li>
      <li className="nav_item">
        <Link to="/contssact">Contact</Link>
      </li>
      <li className="nav_item">
        <Link to="/settinssgs">Settings</Link>
      </li>
      <li className="nav_item">
        <button
          className="btn btn-info logout"
          onClick={logout}
        >Logout</button>
      </li>
    </ul>
    : <ul className="nav_list">
      <li className="nav_item">Home</li>
      <li className="nav_item">Login</li>
      <li className="nav_item">Register</li>
    </ul>
  return (
    <div className="nav_bar">
      {content}
    </div>
  )
}