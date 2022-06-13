import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import React from 'react'
import './Navbar.css'
import Logo from './img/LOGO-MERCERIA-SIN-FONDO.png'

const NavBar = () => {
  return (
            <Navbar expand="lg" variant="light" bg="light" className='nav'>
            <Container >
                    <Link to='/' className="navbar">
                        <Navbar.Brand ><img className='logo' src={Logo}></img> </Navbar.Brand>
                    </Link>
            </Container>
            <br></br>
            <Container>
                    <Link to='/list' className="navbar">
                        <Navbar.Brand className='list' ><strong>📜Lista de precios</strong></Navbar.Brand>
                    </Link>
            </Container>
            <Container>
                    <Link to='/oldsales' className="navbar">
                        <Navbar.Brand className='list' ><strong>📈Historial caja</strong></Navbar.Brand>
                    </Link>
            </Container>
            </Navbar>

            
   
  )
}

export default NavBar
