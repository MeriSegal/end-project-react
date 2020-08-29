import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './BmiView.css'


class BmiView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
        }    
    }

    render() {
        const {activeUser} = this.props;

        const ht = activeUser.height*activeUser.height
        const bmi = (activeUser.weight/ht).toFixed(1)

        return (

            <Card className="bmi-card">
                <Card.Body>
                    <Card.Title> {activeUser.fname}  {activeUser.lname} BMI : {bmi}</Card.Title>
                    <Card.Text>
                    <br/>
                    Heigt: {activeUser.height}
                    <br/>
                    Corent Weight: {activeUser.weight}
                    <br/>
                    updated on: 28-8-2020
                    </Card.Text>
                </Card.Body>
                <Card.Img variant="buttom" src={"https://bestforchoose.com/image/catalog/Health/Body-Mass-Index-Definition/Body-Mass-Index-Definition-Chart-BMI.jpg"} />                
            </Card>           
        );
    }
}

export default BmiView;