import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class HomePage extends Component {
    render() {
        return (
            <div>
              <h1>Every day</h1>  
              <h3>Is a new day</h3>
              <Button variant="primary" size="lg" href="#/signup">Sighn up</Button>
              <br/> <br/>
              <Button variant="primary" size="lg" href="#/login">Login</Button>
            </div>
        );
    }
}

export default HomePage;