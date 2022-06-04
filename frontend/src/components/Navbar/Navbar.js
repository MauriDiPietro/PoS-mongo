import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import React from 'react'
import './Navbar.css'

const NavBar = () => {
  return (
            <Navbar expand="lg" variant="light" bg="light" >
            <Container >
                    <Link to='/' className="navbar">
                        <Navbar.Brand >Home</Navbar.Brand>
                    </Link>
            </Container>
            <Container>
                    <Link to='/list' className="navbar">
                        <Navbar.Brand>Lista de precios</Navbar.Brand>
                    </Link>
            </Container>
            <Container>
                    <Link to='/oldsales' className="navbar">
                        <Navbar.Brand>Historial caja</Navbar.Brand>
                    </Link>
            </Container>
            </Navbar>
   
  )
}

export default NavBar
