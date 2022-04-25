import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import AuthService from "../services/auth.service";
import { Form, Button, Col, Row, InputGroup } from "react-bootstrap";
import authHeader from "../services/auth-header";
import TokenParser from "./helpers/TokenParser";
import RoomService from "../services/room.service";

const AddNew = () => {
    let navigate = useNavigate();
    const form = useRef();
    
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

  const facilities = [
    "Private bathroom",
    "Flat-screen TV",
    "Air conditioning",
    "Desk/Workspace",
    "Kitchen/kitchenette",
    "Panoramic view",
    "Balcony",
    "Terrace",
  ];
  const [validated, setValidated] = useState(false);

  const [roomId, setRoomId] = useState("");
  const [roomMaxpax, setRoomMaxpax] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [roomType, setRoomType] = useState("");
  const [listFacilities, setListFacilities] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(facilities.length).fill(false)
  );

  const onChangeRoomId = (e) => {
    const number = e.target.value;
    setRoomId(number);
  };
  const onChangePax = (e) => {
    const paxnumber = e.target.value;
    setRoomMaxpax(paxnumber);
  };
  const onChangePrice = (e) => {
    const price = e.target.value;
    setRoomPrice(price);
  };
  const onChangeStatus = (e) => {
    const status = e.target.value;
    setRoomStatus(status);
  };
  const onChangeType = (e) => {
    const type = e.target.value;
    setRoomType(type);
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    console.log("position: " + updatedCheckedState);
    if (!checkedState[position]) {
      setListFacilities((listFacilities) => [...listFacilities, position + 1]);
      console.log("facilities add: " + listFacilities);
    } else {
      setListFacilities((listFacilities) =>
        // Filter out the item with the matching index
        listFacilities.filter((i) => i !== position + 1)
      );
      console.log("facilities erase: " + listFacilities);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      RoomService.addRoom(
        roomId,
        roomMaxpax,
        roomPrice,
        roomStatus,
        roomType,
        listFacilities
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

  return (
    <div className="p-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom01">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Room Number"
              onChange={onChangeRoomId}
            />
            <Form.Control.Feedback type="invalid">
              Please enter Room Number
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="6" controlId="validationCustom02">
            <Form.Label>Pax number</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Pax Number"
              onChange={onChangePax}
            />
            <Form.Control.Feedback type="invalid">
              Please enter Pax number
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" required onChange={onChangePrice} />
            <Form.Control.Feedback type="invalid">
              Please enter Room Price
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom04">
            <Form.Label>Status</Form.Label>
            <Form.Control type="text" onChange={onChangeStatus} />
          </Form.Group>

          <Form.Group as={Col} md="4" controlId="validationCustom05">
            <Form.Label>Room type</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={onChangeType}
            >
              <option value="1">Standard Room</option>
              <option value="2">Superior Room</option>
              <option value="3">Cabin</option>
              <option value="4">Apart</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group className="mb-12">
          {facilities.map((type, key) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check
                type="checkbox"
                id={`default-${type}`}
                label={`${type}`}
                value={key}
                checked={checkedState[key]}
                onChange={() => {
                  handleOnChange(key);
                }}
                name={type}
              />
            </div>
          ))}
        </Form.Group>

        <Button type="submit">Add new room</Button>
      </Form>
    </div>
  );
};

export default AddNew;
