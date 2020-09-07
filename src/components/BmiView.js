import React, { Component } from 'react';
import { Card, Table } from 'react-bootstrap';
import './BmiView.css'


class BmiView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
        }    
    }


    bmiRange= ()=>{
        const {pntHeight, pntWeight, pntIsMale} = this.props;
        
        const ht = pntHeight*pntHeight
        const bmi = (pntWeight/ht).toFixed(1)

        let range = ""

        if (pntIsMale){
            if (bmi<20){
                range = "Underweight"
            }else if(bmi<26){
                range = "Normal"
            }else if(bmi<31){
                range = "Overweight"
            }else if(bmi<=40){
                range = "Obesity"
            }else if(bmi>40){
                range = "severe Obesity"
            }
        }else{
            if (bmi<19){
                range = "Underweight"
            }else if(bmi<25){
                range = "Normal"
            }else if(bmi<31){
                range = "Overweight"
            }else if(bmi<=40){
                range = "Obesity"
            }else if(bmi>40){
                range = "severe Obesity"
            }
        }

        return range;
    }



    render() {
        const {userName, pntHeight, pntWeight, updateTime} = this.props;

        const ht = pntHeight*pntHeight
        const bmi = (pntWeight/ht).toFixed(1)
        
        const bmiDetails = [{bmi: "Underweight", male: "> 20", female: "> 19"},
                            {bmi: "Normal", male: "20-25", female: "19-24"},
                            {bmi: "Overweight", male: "26-30", female: "25-30"},
                            {bmi: "Obesity", male: "31-40", female: "31-40"},
                            {bmi: "severe Obesity", male: "< 40", female: "< 40"}]


        const tableRows = bmiDetails.map(detail => 
                                            <tr className={detail.bmi === this.bmiRange() ? "bg-this" : ""}>
                                                <td>{detail.bmi}</td>
                                                <td>{detail.male}</td>
                                                <td>{detail.female}</td>
                                            </tr>);

        return (

            <Card className="bmi-card">
                <Card.Body>
                    <Card.Title> {userName} BMI : {bmi}</Card.Title>
                    <Card.Text>
                    <br/>
                    Height: {pntHeight}
                    <br/>
                    Current Weight: {pntWeight}
                    <br/>
                    Updated on: {updateTime}
                    </Card.Text>
                </Card.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>BMI</th>
                            <th>Male</th>
                            <th>Female</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}                       
                    </tbody>
                </Table>
            </Card>           
        );
    }
}

export default BmiView;