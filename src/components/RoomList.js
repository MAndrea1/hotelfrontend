import React, { Component } from 'react';
import { ButtonGroup, Card, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faEdit, faList, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';



export default class RoomList extends Component {

  constructor (props) {
    super(props);
    this.state = {
      rooms : []
    };
  }

  componentDidMount() {
    this.findAllRooms();

  }

  findAllRooms() {
    axios.get("http://localhost:8080/api/rooms")
    .then(response => response.data)
    .then((data) => {
      this.setState({rooms: data});

    });
  }

  deleteRoom = (roomId) => {
    axios.delete("http://localhost:8080/api/rooms/"+roomId)
    .then (response => {
      if (response.data != null) {
        alert("Room deleted successfully");
        this.setState({
          rooms: this.state.rooms.filter(room => room.id !== roomId)
        }); 
      }

    });

  };


  render() {

    return (
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header> <FontAwesomeIcon icon={faList} /> Room List </Card.Header>
        <Card.Body>
          <Table bordered hover striped variant='dark'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Max Pax</th>
                <th>Room Price</th>
                <th>Room Type</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
            {
            
            this.state.rooms.length === 0 ?
              <tr align= "center">
                <td colSpan="6"> Rooms Available </td>
              </tr> :
              this.state.rooms.map(room => (
                <tr key={room.id}>
                  <td>{room.id} </td>
                  <td>{room.roomMaxpax} </td>
                  <td>{room.roomPrice} </td> 
                  <td>{room.fkRoomtype.roomtypeDetail}</td>
                  <td>
                    <ButtonGroup>
                      <Button size = "md " variant = "outline-primary"><FontAwesomeIcon icon={faEdit} /> </Button>{''}
                      <Button size = "md" variant = "outline-danger" onClick={this.deleteRoom.bind(this, room.id)}> <FontAwesomeIcon icon={faTrash} /></Button>

                    </ButtonGroup>
                  </td>                           
                </tr>
 
              ))
              }
              
            </tbody>           
          </Table>
        </Card.Body>
      </Card>
    )
  }
}
