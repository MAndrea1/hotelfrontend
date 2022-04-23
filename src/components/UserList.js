import React, { Component } from 'react';
import axios from 'axios';
import { Card, Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'

export default class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users : []
        };
    }

    componentDidMount() {
        this.findAllUsers();
    }

    findAllUsers() {
        axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
            .then(response => response.data)
            .then((data) => {
                this.setState({ users: data });
            });
    }


    render() {
        return (
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header> <FontAwesomeIcon icon={faUser} /> User List </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant='dark'>
                            <thead>
                                <tr>
                                    <td> ID </td>
                                    <td> First Name</td>
                                    <td> Last Name </td>
                                    <td> Email </td>
                                    <td> Phone </td>
                                    <td> Country</td>
                                </tr>
                            </thead>
                            <tbody>
                              {this.state.users.length === 0 ?
                              <tr align = "center">
                                  <td colSpan = "6"> No Users Available </td>
                              </tr> :
                              this.state.users.map((user, index) => (
                                  <tr key= {index} > 
                                  <td>{user.created} </td>
                                  <td>{user.first} </td>
                                  <td>{user.last} </td>
                                  <td> {user.email}</td>
                                  <td>{user.balance} </td>
                                  <td>{user.address} </td>
                                  </tr>
                              ))
                              
                            }  
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}