import './App.css';
import React from 'react';
import Appbar from './components/Appbar';
import { Container, Row, Col} from 'react-bootstrap';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
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
    <BrowserRouter>
     <Appbar/> {/* NavBar Component */}
   <Container>
     <Row>
       <Col lg={12} style={marginTop}>
         <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="addRooms/*" element={<AddRooms />} />
          <Route path="RoomList/*" element={<RoomList />} />
          <Route path="users/*" element={<UserList />} />
          <Route path="register/*" element={<Register />} />
          <Route path="login/*" element={<Login />} />
         </Routes>
</Col>
     </Row>
   </Container>
   <Footer/> {/* Footer Component*/}
    </BrowserRouter>
  );
}

export default App;
