import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class PntNavBar extends Component {

    constructor(props) {
        super(props);        
    }

    render() {

        const { handleLogout } = this.props;

        return (
           <Navbar>
              <Navbar.Brand href="#/">Every Day</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse> 
                <Nav className="mr-auto">
                    <Nav.Link href="#/ptr">Food and Symptoms</Nav.Link>
                    <Nav.Link href="#/bmi">BMI</Nav.Link>
                    <Nav.Link href="#/chat">Consulting</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <Nav.Link onClick={() => {handleLogout()}} href="#">Logout</Nav.Link>                   
                </Nav>
           </Navbar>
        );
    }
}

export default PntNavBar;