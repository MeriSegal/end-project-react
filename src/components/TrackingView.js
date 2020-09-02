import React, { Component } from 'react';
import FoodTrModel from '../model/FoodTrModel';
import SymptomTrModel from '../model/SymptomTrModel';
import Parse from 'parse';
import moment from 'moment';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class TrackingView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            theDate: moment().format("DD-MM-YYYY"),
            foodTracking: [],
            symptomTracking: []
        }  
        
    }
   

    componentDidMount(){

       
        const {theDate} = this.state;

        {
            const FoodTracking = Parse.Object.extend('FoodTracking');
            const query = new Parse.Query(FoodTracking);
            query.equalTo("date", theDate);
            query.equalTo("userId", Parse.User.current());
            query.find().then(results => {          
                const trackingFood = results.map(result => new FoodTrModel(result))
                this.setState({
                    foodTracking: trackingFood
                });
            }, (error) => {
                console.error('Error while fetching SymptomList', error);
            });
        }

        {
            const SymptomTracking = Parse.Object.extend('SymptomTracking');
            const query = new Parse.Query(SymptomTracking);
            query.equalTo("date", theDate);
            query.equalTo("userId", Parse.User.current());
            query.find().then(results => {          
                const trickingSymptoms = results.map(result => new SymptomTrModel(result))
                this.setState({
                    symptomTracking: trickingSymptoms
                });
            }, (error) => {
                console.error('Error while fetching SymptomList', error);
            });       
        }
    }

    

    render() {

        const {foodTracking, symptomTracking} = this.props;

        const foodTr = this.state.foodTracking.map(food => 
            <h5 style={{"text-align": "left"}}>{food.time}:  {food.foodName} </h5> 
        );

        const symptomTr = this.state.symptomTracking.map(symp => 
            <h5 style={{"text-align": "left"}} >{symp.time}:  {symp.symptom}  </h5>                           
        );  

        if(foodTracking != undefined){           
            const foodTr = foodTracking.map(food => 
                <h5 style={{"text-align": "left"}}>{food.time}:  {food.foodName} </h5> 
            );
        }

        if(symptomTracking != undefined){
            const symptomTr = symptomTracking.map(symp => 
                <h5 style={{"text-align": "left"}} >{symp.time}:  {symp.symptom}  </h5>                           
            );  
        }


        return (
            <ListGroup style={{display:'table'}}> 
                 <ListGroupItem style={{display: "table-cell"}}>
                     {foodTr}
                 </ListGroupItem>
                 <ListGroupItem style={{display: "table-cell"}}>
                     {symptomTr}
                 </ListGroupItem>
               
            </ListGroup>
        );
    }
}

export default TrackingView;