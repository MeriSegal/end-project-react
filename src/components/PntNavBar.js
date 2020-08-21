import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class PntNavBar extends Component {
    render() {
        return (
           <Navbar>
              <Navbar.Brand href="#/">Every Day</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse> 
                <Nav className="ml-auto">
                    <Nav.Link href="#/ptr">Food and Symptoms</Nav.Link>
                    <Nav.Link href="#/bmi">BMI</Nav.Link>
                    <Nav.Link href="#/chat">Consulting</Nav.Link>
                </Nav>
           </Navbar>
        );
    }
}

export default PntNavBar;