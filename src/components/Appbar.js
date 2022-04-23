import React, {Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaHotel } from 'react-icons/fa';
import {Link} from 'react-router-dom';


export default class Appbar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link to = {""} className = "navbar-brand" >
          <span className='p-2'>
            <FaHotel />
          </span>
        <Navbar.Brand className='p-2'>Hotel</Navbar.Brand>
        </Link>
      <Nav className="mr-auto">
        <Link to = {"AddRooms"} className = "nav-link" >Add Rooms</Link>
        <Link to = {"RoomList"} className = "nav-link" >Room List</Link>
        <Link to = {"users"} className = "nav-link" >User List</Link>       
      </Nav>

      <Nav className = "navbar-right">
        <Link to = {"register"} className = "nav-link" >Register </Link>
        <Link to = {"login"} className = "nav-link" >Log in</Link>
      </Nav>
      
    </Navbar>
    )
  }
}

