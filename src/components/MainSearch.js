import React from "react";
import { Form, Button, Col, Row, Table } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const MainSearch = () => {
  const [consulta, setConsulta] = useState({
    roomNumber: "",
    bookingCheckin: "",
    bookingCheckout: "",
    pax: 1,
    roomType: "",
  });
  const [answer, setAnswer] = useState("");

  const handleInputChange = (event) => {
    setConsulta({
      ...consulta,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    console.log(
      "enviando datos..." + consulta.roomNumber + " " + consulta.bookingCheckin
    );
    console.log(JSON.stringify(consulta));
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setAnswer(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  var data = JSON.stringify(consulta);
  var config = {
    method: "post",
    url: "http://localhost:8080/api/rooms/checkavailability",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  const ResultTable = () => {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Pax</th>
            <th>Price</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {answer.map((room) => {
            return (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.roomMaxpax}</td>
                <td>{room.roomPrice}</td>
                <td>{room.fkRoomtype.roomtypeDetail}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const ShowResults = () => {
    if (answer.length !== 0) {
      return <ResultTable />;
    }
  };

  return (
    <div className="CheckAvailability">
      <Form onSubmit={enviarDatos} className="mb-4">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="checkin">
            <Form.Label>Check-in</Form.Label>
            <Form.Control
              type="date"
              name="bookingCheckin"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="checkout" className="mb-3">
            <Form.Label>Check-out</Form.Label>
            <Form.Control
              type="date"
              name="bookingCheckout"
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="roomNumber">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              as="select"
              name="roomNumber"
              onChange={handleInputChange}
            >
              <option value="">Any Room</option>
              <option value="101">101</option>
              <option value="111">111</option>
              <option value="201">201</option>
              <option value="301">301</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="paxNumber">
            <Form.Label>Pax Number</Form.Label>
            <Form.Control
              type="number"
              name="pax"
              placeholder="Number of passengers"
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="roomType">
            <Form.Label>Room Type</Form.Label>
            <Form.Control
              as="select"
              name="roomType"
              onChange={handleInputChange}
            >
              <option value="">Any Room</option>
              <option value="1">Standard Room</option>
              <option value="2">Superior Room</option>
              <option value="3">Cabin</option>
              <option value="4">Apart</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="With Breakfast" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <ShowResults />
    </div>
  );
};

export default MainSearch;
