import React, { Component } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faSave, faUndo } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'


export default class AddRooms extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.typeChange = this.typeChange.bind(this);
        this.submitRoom = this.typeChange.bind(this);
    }

    initialState = {
        type: '', numbers: '', price: '', maxClient: '', roomStatus: '', description: ''
    }

    resetRoom = () => {
        this.setState(() => this.initialState);
    }

    submitRoom = event => {
        event.preventDefault();


        const room = {
            type: this.state.type,
            numbers: this.state.numbers,
            price: this.state.price,
            maxClient: this.state.maxClient,
            roomStatus: this.state.roomStatus,
            description: this.state.description,
        };

        axios.post("http://localhost:8080/api/rooms", room)
        .then(response =>  {
            if(response.data != null) {
                this.setState(this.initialState);
                alert("Room Saved Successfully")
            }

        });
    }


    typeChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {

        const { type, numbers, price, maxClient, roomStatus, description } = this.state;

        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Add Rooms </Card.Header>

                <Form onReset={this.resetRoom} onSubmit={this.submitRoom} id="addRoomsId">
                    <Card.Body>
                        <Row>
                            <Form.Group as={Col} controlId="formGridType">
                                <Form.Label>ID</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="type"
                                    value={type}
                                    onChange={this.typeChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter ID" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridNumber">
                                <Form.Label>Numbers Max Pax</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="Text" name="numbers"
                                    value={numbers}
                                    onChange={this.typeChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Number Max Pax" />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="price"
                                    value={price}
                                    onChange={this.typeChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Room Price" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMaxClient">
                                <Form.Label>Status</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="maxClient"
                                    value={maxClient}
                                    onChange={this.typeChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Status" />
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} controlId="formGridStatus">
                                <Form.Label>Type of Room</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="roomStatus"
                                    value={roomStatus}
                                    onChange={this.typeChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Type of room" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridDescrion">
                                <Form.Label>Description</Form.Label>
                                <Form.Control required autoComplete="off"
                                    type="text" name="description"
                                    value={description}
                                    onChange={this.typeChange}
                                    className={"bg-dark text-white"}
                                    placeholder="Enter Description" />
                            </Form.Group>
                        </Row>


                    </Card.Body>
                    <Card.Footer style={{ "textAlign": "right" }}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} />
                            Submit
                        </Button > {' '}
                        <Button size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo} />
                            Reset
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        )
    }
}