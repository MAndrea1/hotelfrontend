import React from "react";
import { Route, Routes} from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/User/Login";
import Register from "../components/User/Register";
import Guest from "../components/Guest";
import Admin from "../components/Admin";
import Missing from "../components/Missing";
import Unauthorized from "../components/Unauthorized";
import Layout from "../components/layouts/Layout";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>

                {/*Public Routes*/}
               
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                {/*Private Routes*/}
                <Route path="/" element={<Home />} />
                <Route path="/guest" element={<Guest />} />
                <Route path="/admin" element={<Admin />} />

                {/*Private Routes*/}
                <Route path="*" element={<Missing />} />

            </Route>
        </Routes>
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