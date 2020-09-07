import React, { Component } from 'react';
import PntNavBar from '../../components/PntNavBar';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import FoodModel from '../../model/FoodModel';
import Parse from 'parse';
import SymptomModel from '../../model/SymptomModel';
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import './PntTrackingPage.css'
import FoodTrModel from '../../model/FoodTrModel';
import SymptomTrModel from '../../model/SymptomTrModel';


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
            foodTracking: [],
            updatFood: "",
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
            const foods = results.map(result => new FoodModel(result));
                if (foods[0] !=undefined){
                    this.setState({
                        foodList: foods,
                        food: foods[0].foodName
                    });
                }
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
        myNewObject.set('pntId', Parse.User.current().id);
        myNewObject.set('userId', Parse.User.current());

        myNewObject.save().then(
        (result) => {
            console.log('FoodTracking created', result);
            this.setState(
                {foodInput: ""}
            );
            this.updateFoodTr()
        },
        (error) => {
            console.error('Error while creating FoodTracking: ', error);
        });
    }

    updateFoodTr =()=> {
        const {theDate} = this.state;
        
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
   
    addTrkSymptom = () => {
        const {symptom, symptomTime, theDate} = this.state;

        const SymptomTracking = Parse.Object.extend('SymptomTracking');
        const myNewObject = new SymptomTracking();

        myNewObject.set('date', theDate);
        myNewObject.set('time', symptomTime);
        myNewObject.set('symptom', symptom);
        myNewObject.set('pntId', Parse.User.current().id);
        myNewObject.set('userId', Parse.User.current());

        myNewObject.save().then(
        (result) => {
            console.log('SymptomTracking created', result);
            this.updateSymptomTr()
        },
        (error) => {
            console.error('Error while creating SymptomTracking: ', error);
        }
        );
    }

    updateSymptomTr =()=>{
        const {theDate} = this.state;

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

    async componentDidMount() {
        this.updateFoodTr()
        this.updateSymptomTr()

        {
            const FoodTracking = Parse.Object.extend('FoodTracking');
            const query = new Parse.Query(FoodTracking);           
            query.equalTo("userId", Parse.User.current());
            const results = await query.find();
            const foods = results.map(result => new FoodTrModel(result));
            if (foods[0] !=undefined){
                this.setState({
                    foodList: foods,
                    food: foods[0].foodName
                });
            }            
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
        const {foodTracking, symptomTracking, foodInput, eatTime, food, symptomTime, symptom} = this.state;

        if (!activeUser) {
            return <Redirect to="/" />
        }
              
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

        const eatTimePicker = <TimePicker showSecond={false} defaultValue={moment()} className="t-pick"
                            onChange={this.eatTimeChange} format={this.format} use24Hours inputReadOnly/>

        const sympTimePicker = <TimePicker showSecond={false} defaultValue={moment()} className="t-pick"
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
                <div className="form-title">
                    <h1> date: {this.state.theDate}</h1>
                </div>                

                <ListGroup className="tr-view col-lg-5"> 
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

                <div className="selector-con col-lg-5 col-sm-11">
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


            </div>
        );
    }
}

export default PntTrackingPage;