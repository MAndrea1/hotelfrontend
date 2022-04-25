const axios = require('axios');

const userBooking = (listRooms, bookingCheckin, bookingCheckout, bookingBreakfast, bookingNotes, paymentMethod, fkGuestId) => {
    const user = JSON.parse(localStorage.getItem('user'))

    const data = JSON.stringify({
        "listRooms": listRooms,
        "bookingCheckin": bookingCheckin,
        "bookingCheckout": bookingCheckout,
        "bookingBreakfast": bookingBreakfast,
        "bookingNotes": bookingNotes,
        "status": "ok",
        "paymentMethod": paymentMethod
      });
      
      const config = {
        method: 'post',
        url: 'http://localhost:8080/api/users/reserve/' + fkGuestId,
        headers: { 
          'Authorization': 'Bearer ' + user.token, 
          'Content-Type': 'application/json'
        },
        data : data
      };

    return axios(config)
}

const adminBooking = (listRooms, bookingCheckin, bookingCheckout, bookingBreakfast, bookingNotes, paymentMethod, fkGuestId) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const data = JSON.stringify({
      "listRooms": listRooms,
      "bookingCheckin": bookingCheckin,
      "bookingCheckout": bookingCheckout,
      "bookingBreakfast": bookingBreakfast,
      "bookingNotes": bookingNotes,
      "status": "ok",
      "paymentMethod": paymentMethod,
      "fkGuestId": fkGuestId
    });
    
    const config = {
      method: 'post',
      url: 'http://localhost:8080/api/bookings/reserve',
      headers: { 
        'Authorization': 'Bearer ' + user.token, 
        'Content-Type': 'application/json'
      },
      data : data
    };

  return axios(config)
}

const BookingService = {
    userBooking,
    adminBooking
}

export default BookingService


