import React from 'react'
import { Link } from "react-router-dom"

const Missing = () => {
  return (
    <div>
      <h1> Opps! </h1>
      <p>Page not Found</p>
      <div className="text-white">
          <Link to="/">Visit Our Homepage</Link>
      </div>
    </div>
  )
}

export default Missing