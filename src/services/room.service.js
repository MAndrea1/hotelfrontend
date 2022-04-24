const axios = require('axios');

const addRoom = (roomId, roomMaxpax, roomPrice, roomStatus, roomType, listFacilities) => {
    const user = JSON.parse(localStorage.getItem('user'))

    const data = JSON.stringify({
        "roomId": roomId,
        "roomMaxpax": roomMaxpax,
        "roomPrice": roomPrice,
        "roomStatus": roomStatus,
        "roomType": roomType,
        "listFacilities": listFacilities
      });
      
      const config = {
        method: 'post',
        url: 'http://localhost:8080/api/rooms/addnewroom',
        headers: { 
          'Authorization': 'Bearer ' + user.token, 
          'Content-Type': 'application/json'
        },
        data : data
      };

    return axios(config)
}

const deleteRoom = (roomId) => {
  const user = JSON.parse(localStorage.getItem('user'))
    
    const config = {
      method: 'delete',
      url: 'http://localhost:8080/api/rooms/' + roomId,
      headers: { 
        'Authorization': 'Bearer ' + user.token, 
        'Content-Type': 'application/json'
      },
    };

  return axios(config)
}

const RoomService = {
  addRoom,
  deleteRoom,
}

export default RoomService


