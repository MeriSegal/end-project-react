import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class LoginPage extends Component {
    render() {
        return (
            <div>
                 <Button variant="primary" size="lg" href="#/ptr">Login Patient</Button>
                 <Button variant="primary" size="lg" href="#/patients">Login Nutrit</Button>

            </div>
        );
    }
}

export default LoginPage;