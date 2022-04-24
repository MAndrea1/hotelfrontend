import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import AddNew from "./AddNew";
import RoomService from "../services/room.service";

const DisplayInfo = () => {
  const [roomList, setRoomList] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [toggleAddUserForm, setToggleAddUserForm] = useState(false);

  const getRooms = async () => {
    const allRooms = await axios.get("http://localhost:8080/api/rooms");
    setRoomList(allRooms.data);
    setHeaders(Object.keys(allRooms.data[0]));
    setHeaders((headers) => [...headers, "actions"]);
  };

  useEffect(() => {
    getRooms();
  }, []);
  
  const handleDelete = (id) => {
      RoomService.deleteRoom(id
      ).then(
        (response) => {
            console.log(response);
            console.log("success");
            window.location.reload();
          },
          (error) => {
            console.log(error.response.data);
          }
      );
  };

  const ToggleAddUser = () => {
    if (toggleAddUserForm) {
      return <AddNew />;
    } else {
      return (
        <Button
          variant="primary"
          type="submit"
          className="m-3"
          onClick={() => {
            setToggleAddUserForm(true);
          }}
        >
          Add New Room
        </Button>
      );
    }
  };

  return (
    <div className="text-light mb-5 bg-dark rounded-3">
      {roomList.length !== 0 ? (
        <>
          <ToggleAddUser />
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                {headers.map((headers) => {
                  return (
                    <React.Fragment key={headers}>
                      <th>{headers}</th>
                    </React.Fragment>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {roomList.map((room) => {
                return (
                  <React.Fragment key={room.id}>
                    <tr>
                      <td>{room.id}</td>
                      <td>{room.roomMaxpax}</td>
                      <td>{room.roomPrice}</td>
                      <td>{room.status}</td>
                      <td>{room.fkRoomtype.roomtypeDetail}</td>
                      <td>
                        {room.facilities.map((facility) => {
                          return (
                            <React.Fragment key={facility.id}>
                              <ul>
                                <li>{facility.facilityDetail}</li>
                              </ul>
                            </React.Fragment>
                          );
                        })}
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          type="submit"
                          className="m-3"
                          onClick={() => {handleDelete(room.id)}}
                        >
                          Remove Room
                        </Button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </Table>
        </>
      ) : (
        <>
          Loading...
          <span className="spinner-border spinner-border-sm"></span>
        </>
      )}
    </div>
  );
};

export default DisplayInfo;
