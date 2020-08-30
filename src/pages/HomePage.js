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
            <div className="home">
              <div className="title">
                <h1>Every day</h1>  
                <h3>Is a new day</h3>
              </div>
              <div className="nutrit">
                <h2>Nurit Ron - Nutritionist </h2>
                <h2>054-3212345</h2>
              </div>
              <div className="btn-con">
                <Button variant="primary" size="lg" href="#/signup">Sign up</Button>              
                <Button variant="primary" size="lg" href="#/login">Login</Button>
              </div> 
              <div className="carousel-contaner">
                <CarouselView/>
              </div>
            </div>
        );
    }
}

export default HomePage;