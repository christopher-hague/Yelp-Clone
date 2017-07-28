import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <NavLink to="/">Home</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
