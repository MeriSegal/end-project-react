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
        const {userName, pntHeight, pntWeight} = this.props;

        const ht = pntHeight*pntHeight
        const bmi = (pntWeight/ht).toFixed(1)
        
        return (

            <Card className="bmi-card">
                <Card.Body>
                    <Card.Title> {userName} BMI : {bmi}</Card.Title>
                    <Card.Text>
                    <br/>
                    Heigt: {pntHeight}
                    <br/>
                    Corent Weight: {pntWeight}
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