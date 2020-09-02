import React, { Component } from 'react';
import PntNavBar from '../../components/PntNavBar';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import FoodModel from '../../model/FoodModel';
import Parse from 'parse';
import SymptomModel from '../../model/SymptomModel';
import { Button, Form, Col, Row } from 'react-bootstrap';
import TrackingView from '../../components/TrackingView';
import './PntTrackingPage.css'
import FoodTrModel from '../../model/FoodTrModel';


class PntTrackingPage extends Component {

    constructor(props) {
        super(props);    

        this.format = 'h:mm a';

        this.state = {
            theDate: moment().format("DD-MM-YYYY"),
            food: "", 
            eatTime: moment().format("h:mm a"),           
            foodInput: "",
            foodList: [],
            trackingFood: [],
            symptom: "",
            symptomTime: moment().format("h:mm a"),
            symptomInput: "",
            symptomList: [],
            symptomTracking: []
        }    
    }
    
    changeFood = (event) => {

        this.setState(
            {foodInput: event.target.value}
        );

        const FoodDisplay = Parse.Object.extend('FoodDisplay');
            const query = new Parse.Query(FoodDisplay);
            query.contains("Display_Name", event.target.value);
            query.equalTo("Portion_Default", 1);
            query.find().then((results) => {
                this.setState({
                    foodList: results.map(result => new FoodModel(result))
                });
                console.log('FoodDisplay found', results);
              }, (error) => {
                console.error('Error while fetching FoodDisplay', error);
              });
            
    }

    addTrkFood = () => {

        const {food, eatTime, theDate} = this.state;

        const FoodTracking = Parse.Object.extend('FoodTracking');
        const myNewObject = new FoodTracking();

        myNewObject.set('date', theDate);
        myNewObject.set('time', eatTime);
        myNewObject.set('foodName', food);
        myNewObject.set('calories', 1);
        myNewObject.set('userId', Parse.User.current());

        myNewObject.save().then(
        (result) => {
            console.log('FoodTracking created', result);
            this.setState(
                {foodInput: ""}
            );
            this.updateFoodTracking()
        },
        (error) => {
            console.error('Error while creating FoodTracking: ', error);
        });
    }

    updateFoodTracking =()=> {
        const theDate = moment().format("DD-MM-YYYY");

        const FoodTracking = Parse.Object.extend('FoodTracking');
        const query = new Parse.Query(FoodTracking);
        query.equalTo("date", theDate);
        query.equalTo("userId", Parse.User.current());
        query.find().then(results => {  
            this.setState({
                trackingFood: results.map(result => new FoodTrModel(result))
            });
        }, (error) => {
            console.error('Error while fetching SymptomList', error);
        });
    }

    addTrkSymptom = () => {
        const {symptom, symptomTime, theDate} = this.state;

        const SymptomTracking = Parse.Object.extend('SymptomTracking');
        const myNewObject = new SymptomTracking();

        myNewObject.set('date', theDate);
        myNewObject.set('time', symptomTime);
        myNewObject.set('symptom', symptom);
        myNewObject.set('userId', Parse.User.current());

        myNewObject.save().then(
        (result) => {
            console.log('SymptomTracking created', result);
        },
        (error) => {
            console.error('Error while creating SymptomTracking: ', error);
        }
        );
    }

    async componentDidMount() {

        {
            const FoodTracking = Parse.Object.extend('FoodTracking');
            const query = new Parse.Query(FoodTracking);           
            query.equalTo("userId", Parse.User.current());
            const results = await query.find();
            const foods = results.map(result => new FoodTrModel(result));
            this.setState({
                foodList: foods,
                food: foods[0].foodName
            });
        }


        {
            const SymptomList = Parse.Object.extend('SymptomList');
            const query = new Parse.Query(SymptomList);
            const results = await query.find();
            const symptoms = results.map(result => new SymptomModel(result));
            this.setState({
                symptomList: symptoms,
                symptom: symptoms[0].symptomName
            });
        }
    }

    eatTimeChange = (value)=> {
        this.setState(
            {eatTime: value.format(this.format)}
        );
    }

    sympTimeChange = (value)=> {
        this.setState(
            {symptomTime: value.format(this.format)}
        );
    }

    foodSelect = (event)=>{
        this.setState(
            {food : event.target.value}
        )
    }
  
    symptomSelect = (event)=>{
        this.setState(
            {symptom : event.target.value}
        )
    }

  

    render() {
        const {activeUser, handleLogout} = this.props;        
        const {trackingFood, symptomTracking, foodInput, eatTime, food, symptomTime, symptom} = this.state;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        const eatTimePicker = <TimePicker showSecond={false} defaultValue={moment()} className="xxx t-pick"
                            onChange={this.eatTimeChange} format={this.format} use24Hours inputReadOnly/>

        const sympTimePicker = <TimePicker showSecond={false} defaultValue={moment()} className="xxx t-pick"
                                onChange={this.sympTimeChange} format={this.format} use24Hours inputReadOnly />
    

        const foodOptions = this.state.foodList.filter(foods => (foods.foodName).toLowerCase()
                                .includes((this.state.foodInput).toLowerCase()))
                                .map(foodfilter => <option value= {foodfilter.foods} >{foodfilter.foodName}</option>);


        const symptomOptions = this.state.symptomList.filter(symptoms => (symptoms.symptomName).toLowerCase()
                                .includes((this.state.symptomInput).toLowerCase()))
                                .map(symptomfilter => <option value= {symptomfilter.symptoms} >{symptomfilter.symptomName}</option>);

        return (
            <div className="fillScr">
                <PntNavBar handleLogout={handleLogout}/>                
                Pnt Tracking Page {activeUser.fname} {activeUser.lname}
                <br/>
                <h1> date: {this.state.theDate}</h1>

                <div className="selector-con">
                    <div className="eat-con">              
                        <h3>when did you eat? </h3>
                            {eatTimePicker} 
                        <Form.Control type="text" placeholder="Search and select from the list:" value={foodInput} onChange={this.changeFood}/>
                        
                        <select onClick={this.foodSelect}>
                            {foodOptions}         
                        </select>
                        <p>{eatTime}: {food}</p>
                        <Button variant="primary" size="lg" onClick={this.addTrkFood} block variant="success">Add food </Button>
                    </div>

                    <div className="symp-con">
                        <h3>when did you feel symptom? </h3>
                            {sympTimePicker}
                        <Form.Control type='text' onChange={(e)=> this.setState({symptomInput: e.target.value})} />
                        <select onClick={this.symptomSelect}>
                            {symptomOptions}         
                        </select>
                        <p>{symptomTime}: {symptom}</p>
                        <Button variant="primary" size="lg" onClick={this.addTrkSymptom} block variant="success">Add symptom </Button>
                    </div>
                </div>
                <TrackingView className="tr-view" trackingFood={trackingFood} symptomTracking={symptomTracking}/>

            </div>
        );
    }
}

export default PntTrackingPage;