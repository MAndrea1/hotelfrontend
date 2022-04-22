import * as React from 'react';
import MainSearch from '../MainSearch';

const Welcome = () => {

      return (
        <div className="p-5 mb-4 bg-dark rounded-3">
        <div className="h-100 p-5 text-white bg-dark rounded">
          <h1 className="display-5 fw-bold">Booking App </h1>
            <p className = "col-md-8 fs-4">Maximize and simplify the reservation process through an automated system where users can make their own reservation through the web app without any human interaction</p>
            <MainSearch/>
        </div>
      </div>
      )

  }
  export default Welcome;