import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import AuthService from "../services/auth.service";
import { Form, Button, Col, Row } from "react-bootstrap";
import authHeader from "../services/auth-header";
import TokenParser from "./helpers/TokenParser";
import BookingService from "../services/booking.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Please choose an option
      </div>
    );
  }
};

const Booking = () => {
  let navigate = useNavigate();
  const form = useRef();

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [total, setTotal] = useState(0);

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [userRole, setUserRole] = useState("");

  const [listRooms, setListRooms] = useState([]);
  const [bookingCheckin, setBookingCheckin] = useState("");
  const [bookingCheckout, setBookingCheckout] = useState("");
  const [bookingBreakfast, setBookingBreakfast] = useState(0);
  const [fkGuestId, setFkGuestId] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(1);

  const onChangeNotes = (e) => {
    const notes = e.target.value;
    setBookingNotes(notes);
  };
  const onChangePaymentMethod = (e) => {
    const payment = e.target.value;
    setPaymentMethod(payment);
  };
  const onChangeBreakfast = (e) => {
    setChecked(!checked);
    setBookingBreakfast(checked ? "0" : "1");
  };

  const onChangeGuestID = (e) => {
    const guestID = e.target.value;
    setFkGuestId(guestID);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const bookingData = AuthService.getCurrentBookingData();

    if (!user) {
      navigate("/login");
      window.location.reload();
    } else if (!bookingData) {
      navigate("/");
    }

    if (user.role.userroleRole.includes("USER")) {
      setUserRole("USER");
      setFkGuestId(TokenParser.parseJwt(user.token).sub);
    } else {
      setUserRole("ADMIN");
    }

    console.log(bookingData);

    setListRooms(bookingData.listRooms);
    setBookingCheckin(bookingData.bookingCheckin);
    setBookingCheckout(bookingData.bookingCheckout);

    setTotal(
      bookingData.room.roomPrice *
        Days(bookingData.bookingCheckin, bookingData.bookingCheckout)
    );
  }, [navigate]);

  console.log(bookingBreakfast)

  const enviarDatos = (event) => {
    event.preventDefault();
    console.log("enviando datos...");
    setLoading(true);
    if (userRole === "USER") {
      BookingService.userBooking(
        listRooms,
        bookingCheckin,
        bookingCheckout,
        bookingBreakfast,
        bookingNotes,
        paymentMethod,
        fkGuestId
      ).then(
        (response) => {
          setLoading(false);
          setSuccessful(true);
          console.log(response);
          console.log("success");
          navigate("/successful");
          window.location.reload();
        },
        (error) => {
          setLoading(false);
          console.log(error.response.data);
          setMessage(error.response.data);
          setSuccessful(false);
        }
      );
    } else {
      BookingService.adminBooking(
        listRooms,
        bookingCheckin,
        bookingCheckout,
        bookingBreakfast,
        bookingNotes,
        paymentMethod,
        fkGuestId
      ).then(
        (response) => {
          setLoading(false);
          setSuccessful(true);
          console.log(response);
          console.log("success");
          navigate("/successful");
          window.location.reload();
        },
        (error) => {
          setLoading(false);
          console.log(error.response.data);
          setMessage(error.response.data);
          setSuccessful(false);
        }
      );
    }
  };

  const AdminOptionsSwitch = () => {
    if (userRole !== "USER") {
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
            value={fkGuestId}
            onChange={onChangeGuestID}
          />
        </Form.Group>
      </>
    );
  };

  return (
    <div className="text-light">
      <h3>Room Nº {listRooms}</h3>
      <p>
        from {bookingCheckin} to {bookingCheckout}
      </p>
      <p>Total: ${total}</p>

      <Form onSubmit={enviarDatos} ref={form}>
        <Form.Group className="mb-3" controlId="formNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            placeholder="Special notes"
            name="bookingNotes"
            onChange={onChangeNotes}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPayment">
            <Form.Label>Payment method</Form.Label>
            <Form.Control
              as="select"
              name="paymentMethod"
              onChange={onChangePaymentMethod}
              validations={[required]}
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
            onChange={onChangeBreakfast}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {loading && (
            <span className="spinner-border spinner-border-sm"></span>
          )}
          Book this room
        </Button>

        {message && (
          <div className="form-group mt-2">
            <div
              className={
                successful ? "alert alert-success" : "alert alert-danger"
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

const Days = (date1, date2) => {
  var date1 = new Date(date1);
  var date2 = new Date(date2);
  // To calculate the time difference of two dates
  var time = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  return time / (1000 * 3600 * 24);
};

export default Booking;
