import './App.css';
import React from 'react';
import Appbar from './components/common/Appbar';
import { Container, Row, Col} from 'react-bootstrap';
import Welcome from './components/common/Welcome';
import Footer from './components/common/Footer';
import AddRooms from './components/AddRooms';
import RoomList from './components/RoomList';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserList from './components/UserList';
import Login from './components/User/Login';
import Register from './components/User/Register';

function App() {
  const marginTop = {
    marginTop: "20px"
  };
  return (
    <div>

    </div>
  );
}

export default App;
