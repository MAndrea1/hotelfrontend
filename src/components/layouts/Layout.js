import React from 'react';
import Appbar from "../common/Appbar";
import {Col, Container, Row} from "react-bootstrap";
import Footer from "../common/Footer";

const Layout = () =>{
    return(
        <div>
            <Appbar/> {/* NavBar Component */}
            <Container>
                <Row>
                    <Col lg={12} >

                    </Col>
                </Row>
            </Container>
            <Footer/> {/* Footer Component*/}
        </div>
    );
}

export default Layout;