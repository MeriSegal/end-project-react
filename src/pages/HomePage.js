import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import './HomePage.css'
import CarouselView from '../components/CarouselView';


class HomePage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
        }    
    }
    
    render() {
        return (
            <div>
              <h1>Every day</h1>  
              <h3>Is a new day</h3>
              <Button variant="primary" size="lg" href="#/signup">Sighn up</Button>
              <br/> <br/>
              <Button variant="primary" size="lg" href="#/login">Login</Button>
              <div className="carousel-contaner">
                <CarouselView/>
              </div>
            </div>
        );
    }
}

export default HomePage;