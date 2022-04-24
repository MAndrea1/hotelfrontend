import React from "react";
import AuthService from "../services/auth.service";
import { Form, Button, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const MainSearch = () => {
  let navigate = useNavigate();

  const [consulta, setConsulta] = useState({
    roomNumber: "",
    bookingCheckin: "",
    bookingCheckout: "",
    pax: 1,
    roomType: "",
  });

  const [bookingData, setBookingData] = useState({
    room: "",
    listRooms: [],
    bookingCheckin: "",
    bookingCheckout: "",
    bookingBreakfast: 0,
    bookingNotes: "",
    status: "",
    paymentMethod: "",
  });

  const [answer, setAnswer] = useState("");
  const [currentUser, setCurrentUser] = useState(undefined);
  const [pressedBooking, setpressedBooking] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleInputChange = (event) => {
    setConsulta({
      ...consulta,
      [event.target.name]: event.target.value,
    });
  };

  const enviarDatos = (event) => {
    event.preventDefault();
    console.log("enviando datos...");
    setLoading(true);
    console.log(JSON.stringify(consulta));
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setAnswer(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
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

  const ShowResults = () => {
    if (answer.length !== 0) {
      return <ResultTable />;
    } else {
      return(
        <p>No matches</p>
      )
    }
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
            <th>Book</th>
          </tr>
        </thead>
        <tbody>
          {answer.map((room) => {
            return (
              <tr key={room.id} className="flex">
                <td>{room.id}</td>
                <td>{room.roomMaxpax}</td>
                <td>{room.roomPrice}</td>
                <td>{room.fkRoomtype.roomtypeDetail}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => saveData(room)}
                  >
                    Book this room
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const saveData = (room) => {
    setBookingData({
      room: room,
      listRooms: [room.id],
      bookingCheckin: consulta.bookingCheckin,
      bookingCheckout: consulta.bookingCheckout,
      bookingBreakfast: 0,
      bookingNotes: "",
      status: "",
      paymentMethod: "",
    });
    setpressedBooking(true);
  };

  useEffect(() => {
    if (pressedBooking) {
      localStorage.setItem("bookingData", JSON.stringify(bookingData));
      if (currentUser === undefined) {
        navigate("/login");
      } else {
        navigate("/booking");
      }
    }
  }, [pressedBooking, bookingData, navigate, currentUser]);

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
            <Form.Control as="select" name="pax" onChange={handleInputChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </Form.Control>
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

        {/* <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="With Breakfast" onClick={() => {setBookingData({...bookingData, bookingBreakfast: 1})}} />
        </Form.Group> */}

        <Button variant="primary" type="submit">
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          Submit
        </Button>
      </Form>

      <ShowResults />
    </div>
  );
};

export default MainSearch;
