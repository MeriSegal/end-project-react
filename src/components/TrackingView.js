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
        const {pntId} = this.props;

        {
            const FoodTracking = Parse.Object.extend('FoodTracking');
            const query = new Parse.Query(FoodTracking);
            query.equalTo("date", theDate);
            query.equalTo("pntId", pntId+"");
            query.find().then(results => {          
                const trackingFood = results.map(result => new FoodTrModel(result))
                this.setState({
                    foodTracking: trackingFood
                });
                console.log("tr food: ", trackingFood );
            }, (error) => {
                console.error('Error while fetching SymptomList', error);
            });
        }

        {
            const SymptomTracking = Parse.Object.extend('SymptomTracking');
            const query = new Parse.Query(SymptomTracking);
            query.equalTo("date", theDate);
            query.equalTo("pntId",pntId+"");
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

        const {foodTracking, symptomTracking} = this.state;

        const mrFoodTr = foodTracking.filter(eat => (eat.time).includes("am"))
                        .sort((a, b) => a.time > b.time ? 1 : -1)
                        .map(food => <p>{food.time}: {food.foodName}</p>
        );
               
        const noonFoodTr = foodTracking.filter(eat => (eat.time).includes("pm"))
                        .sort((a, b) => a.time > b.time ? 1 : -1)
                        .map(food => <p>{food.time}: {food.foodName}</p>
        );

        const mrSymptomTr = symptomTracking.filter(st => (st.time).includes("am"))
                        .sort((a, b) => a.time > b.time ? 1 : -1)
                        .map(symp => <p>{symp.time}: {symp.symptom}</p>                     
        );  

        const noonSymptomTr = symptomTracking.filter(st => (st.time).includes("pm"))
                        .sort((a, b) => a.time > b.time ? 1 : -1)
                        .map(symp => <p>{symp.time}: {symp.symptom}</p>  
        );               

        return (
            <div className="tr-view-con">
                <ListGroup className="tr-view"> 
                    <ListGroupItem className="eat-view">
                        <h5>Meals:</h5>
                        <div className="mrn"> <h6>Morning:</h6> {mrFoodTr}</div>
                        <div className="eve"> <h6>Afternoon:</h6> {noonFoodTr}</div>                             
                    </ListGroupItem>
                    <ListGroupItem className="symp-view">
                        <h5>Symptoms:</h5>
                        <div className="mrn"> <h6>Morning:</h6> {mrSymptomTr}</div>
                        <div className="eve"> <h6>Afternoon:</h6> {noonSymptomTr}</div>
                    </ListGroupItem>               
                </ListGroup>
            </div>

        );
    }
}

export default TrackingView;