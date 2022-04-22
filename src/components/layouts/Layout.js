import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Appbar from "../common/Appbar";
import Footer from "../common/Footer";

const Layout = () =>{
    return(
        <div>
            <Appbar/> {/* NavBar Component */}
            <Container>
                <Row>
                    <Col lg={12} >
                        <Outlet/>
                    </Col>
                </Row>
            </Container>
            <Footer/> {/* Footer Component*/}
        </div>
    );
}

export default Layout;