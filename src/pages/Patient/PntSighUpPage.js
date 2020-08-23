import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class PntSighUpPage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
        }    
    }
    
    render() {
        return (
            <div>
                <Button variant="primary" size="lg" href="#/ptr">Login</Button>
                Pnt SighUp Page
            </div>
        );
    }
}

export default PntSighUpPage;