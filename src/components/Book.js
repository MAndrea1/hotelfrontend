import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import AuthService from "../services/auth.service";
import { Form, Button, Col, Row } from "react-bootstrap";
import authHeader from "../services/auth-header";

const Book = () => {
  let navigate = useNavigate();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [total, setTotal] = useState(0);

  const [bookingData, setBookingData] = useState({
    listRooms: "",
    bookingCheckin: "",
    bookingCheckout: "",
    bookingBreakfast: "",
    bookingNotes: "",
    status: "",
    paymentMethod: "",
  });

  const [user, setUser] = useState({
    email: "",
    name: "",
    role: "",
  });

  const [checked, setChecked] = useState(false);

  const [userID, setUserID] = useState("");

  const [adminGuestID, setAdminGuestID] = useState("");

  console.log(adminGuestID);

  const onChangeAdminGuestID = (e) => {
    const adminGuestID = e.target.value;
    setAdminGuestID(adminGuestID);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const bookingData = AuthService.getCurrentBookingData();

    if (!user) {
      navigate("/");
      window.location.reload();
    } else if (!bookingData) {
      navigate("/");
    }

    if (user.role.userroleRole.includes("USER")) {
      setUserID(parseJwt(user.token).sub);
    }

    setBookingData(AuthService.getCurrentBookingData());
    setUser(AuthService.getCurrentUser());
    setTotal(200);
  }, [navigate]);

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  // To set two dates to two variables
  var date1 = new Date(bookingData.bookingCheckin);
  var date2 = new Date(bookingData.bookingCheckout);
  // To calculate the time difference of two dates
  var time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  var days = time / (1000 * 3600 * 24);

  const handleInputChange = (event) => {
    setBookingData({
      ...bookingData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAdminUserID = (event) => {
    setBookingData({
      ...bookingData,
      fkGuestId: event.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const bf = checked ? "0" : "1";
    setLoading(true);
    setBookingData({
      ...bookingData,
      bookingBreakfast: bf,
    });
    delete bookingData.room;
    setData(JSON.stringify(bookingData));
    if (user.role.userroleRole === "USER") {
      console.log("User book");
      console.log(data);
      axios(config1)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    } else {
      setBookingData({
        ...bookingData,
        fkGuestId: adminGuestID
      });
      setData(JSON.stringify(bookingData));
      console.log("admin book");
      console.log(data);
      axios(config2)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    }
  };

  const usertoken = JSON.parse(localStorage.getItem("user"));
  var config1 = {
    method: "post",
    url: "http://localhost:8080/api/users/reserve/" + userID,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + usertoken.token,
    },
    data: data,
  };
  var config2 = {
    method: "post",
    url: "http://localhost:8080/api/booking/reserve",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + usertoken.token,
    },
    data: data,
  };

  const AdminOptionsSwitch = () => {
    if (user.role.userroleRole !== "USER") {
      return <AdminOptions />;
    }
  };

  const AdminOptions = () => {
    return (
      <>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Guest ID</Form.Label>
          <Form.Control
            name="adminGuestID"
            type="number"
            value={adminGuestID}
            onChange={onChangeAdminGuestID}
          />
        </Form.Group>
      </>
    );
  };



  var axios = require('axios');
  var thevar = JSON.stringify({
  "listRooms": [
    102
  ],
  "bookingCheckin": "2023-11-10",
  "bookingCheckout": "2023-11-15",
  "bookingBreakfast": 1,
  "bookingNotes": "Notas",
  "status": "ok",
  "paymentMethod": 1,
  "fkGuestId": 14
});

var config = {
  method: 'post',
  url: 'http://localhost:8080/api/bookings/reserve',
  headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMiIsImlhdCI6MTY1MDc2MjA2OSwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJleHAiOjE2NTA3NjU2Njl9.jmgkyDVWKAFJYnMCQyX9G-_xdzFH0Tghc7BK4aPWwJklH8MTR9vFuHlLY_KpLt8IyNet8OiolSH3eCzHrEva_w', 
    'Content-Type': 'application/json'
  },
  data : thevar
};

const test = (event) => {
  event.preventDefault();
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
}



  return (
    <div className="text-light">
      <h3>Room Nº {bookingData.listRooms[0]}</h3>
      <p>
        from {bookingData.bookingCheckin} to {bookingData.bookingCheckout}
      </p>
      <p>Total: ${days * total}</p>

      <Form onSubmit={test} ref={form}>
        <Form.Group className="mb-3" controlId="formNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            placeholder="Special notes"
            name="bookingNotes"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPayment">
            <Form.Label>Payment method</Form.Label>
            <Form.Control
              as="select"
              name="paymentMethod"
              onChange={handleInputChange}
            >
              <option value="1">Credit Card</option>
              <option value="2">Debit Card</option>
              <option value="3">Bank Transfer</option>
              <option value="4">Cash</option>
              <option value="5">Digital Wallet</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <AdminOptionsSwitch />

        <Form.Group className="mb-3" id="formBreakfast">
          <Form.Check
            type="checkbox"
            label="Breakfast"
            checked={checked}
            value="1"
            onChange={(e) => setChecked(e.currentTarget.checked)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          Book this room
        </Button>
      </Form>
    </div>
  );
};

export default Book;
