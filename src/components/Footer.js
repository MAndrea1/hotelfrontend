import React, {Component} from 'react';
import { Container, Navbar, Col } from 'react-bootstrap';

export default class Footer extends Component {
    render() {
        let fullYear = new Date().getFullYear();
      return (
        <Navbar fixed="bottom" bg="dark" variant = "dark">
            <Container>
                <Col lg={12} className= "text-center text-muted">
                    <div>{fullYear}, Hotel Booking app  KODIGO PROJECT </div>
                </Col>
            </Container>
        </Navbar>
      )
    }
  }