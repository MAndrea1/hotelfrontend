import './App.css';
import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Login from './components/session/Login';
import Profile from './components/session/Profile';
import Register from './components/session/Register';
import BoardAdmin from './components/boards/BoardAdmin';
import BoardUser from './components/boards/BoardUser';
import { FaHotel } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import EventBus from "./services/EventBus";
import { circularProgressClasses } from '@mui/material';

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showSuperadminBoard, setShowSuperaminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      console.log(user)
      setShowUserBoard(user.role.userroleRole.includes("USER"));
      setShowAdminBoard(user.role.userroleRole.includes("ADMIN"));
      setShowSuperaminBoard(user.role.userroleRole.includes("SUPERADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowAdminBoard(false);
    setShowSuperaminBoard(false);
    setShowUserBoard(false);
    setCurrentUser(undefined);
  };


  return (
    <BrowserRouter>
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand ml-3">
          <FaHotel />Hotel
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}
          {showSuperadminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}
          {showUserBoard && (
            <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              Book a Room
            </Link>
          </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">            
           {showUserBoard && (
            <li className="nav-item">
            <Link to={"/profile"} className="nav-link">
              Hello, {currentUser.name}
            </Link>
          </li>
          )}
            
            
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Log Out
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/home" element={<Welcome/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
        </Routes>
      </div>
      <Footer/> {/* Footer Component*/}
    </div>
    </BrowserRouter>
  );
}

export default App;
