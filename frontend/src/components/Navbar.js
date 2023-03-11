import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/boost.png"

function NavBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><img className="text-left" src={logo}></img></Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="flex-column align-items-end">
          <Nav>
            <Nav.Link href="#soccer">Soccer</Nav.Link>
            <Nav.Link href="#basketball">Basketball</Nav.Link>
            <Nav.Link href="#volleyball">Volleyball</Nav.Link>
            <Nav.Link href="#tennis">Tennis</Nav.Link>
            <Nav.Link href="#football">Football</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;


