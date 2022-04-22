import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Login from "../components/User/Login";
import Register from "../components/User/Register";
import Test from "../components/layouts/Test";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route element={<Test/>}>
                    <Route path="/" index element={<App />} />
                    <Route path="home" element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="login" element={<Register />} />
                </Route>
            </Routes>
        </Router>
    );
}
export default AppRoutes;


/*
* <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="addRooms/*" element={<AddRooms />} />
          <Route path="RoomList/*" element={<RoomList />} />
          <Route path="users/*" element={<UserList />} />
          <Route path="register/*" element={<Register />} />
          <Route path="login/*" element={<Login />} />
         </Routes>
*
* */