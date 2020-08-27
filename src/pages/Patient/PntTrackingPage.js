import React, { Component } from 'react';
import PntNavBar from '../../components/PntNavBar';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import FoodModel from '../../model/FoodModel';
import Parse from 'parse';
import SymptomModel from '../../model/SymptomModel';
import { Button } from 'react-bootstrap';


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
            symptom: "",
            symptomTime: moment().format("h:mm a"),
            symptomInput: "",
            symptomList: []
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

    changeFood = (event) => {
        this.setState(
            {foodInput: event.target.value}
        );
    }

    symptomSelect = (event)=>{
        this.setState(
            {symptom : event.target.value}
        )
    }

    changeSymptom = (event) => {
        this.setState(
            {symptomInput: event.target.value}
        );
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
        },
        (error) => {
            console.error('Error while creating FoodTracking: ', error);
        }
        );
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

        const FoodDisplay = Parse.Object.extend('FoodDisplay');
        const query = new Parse.Query(FoodDisplay);
        query.equalTo("hide", false);
        const results = await query.find();
        const allFood = results.map(result => new FoodModel(result));
        this.setState({
            foodList: allFood
        });


        const SymptomList = Parse.Object.extend('SymptomList');
        const Squery = new Parse.Query(SymptomList);
        const Sresults = await Squery.find();
        const symptoms = Sresults.map(result => new SymptomModel(result));
        this.setState({
            symptomList: symptoms
        });
    }



    render() {
        const {activeUser, handleLogout} = this.props;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        const eatTimePicker = <TimePicker showSecond={false} defaultValue={moment()} className="xxx"
                            onChange={this.eatTimeChange} format={this.format} use12Hours inputReadOnly/>

        const sympTimePicker = <TimePicker showSecond={false} defaultValue={moment()} className="xxx"
                                onChange={this.sympTimeChange} format={this.format} use12Hours inputReadOnly />
    

        const foodOptions = this.state.foodList.filter(foods => (foods.foodName).toLowerCase()
                                .includes((this.state.foodInput).toLowerCase()))
                                .map(foodfilter => <option value= {foodfilter.foods} >{foodfilter.foodName}</option>);


        const symptomOptions = this.state.symptomList.filter(symptoms => (symptoms.symptomName).toLowerCase()
                                .includes((this.state.symptomInput).toLowerCase()))
                                .map(symptomfilter => <option value= {symptomfilter.symptoms} >{symptomfilter.symptomName}</option>);

        return (
            <div>
                <PntNavBar handleLogout={handleLogout}/>                
                Pnt Tracking Page {activeUser.fname}
                <br/>
                <h1> date: {this.state.theDate}</h1>

                <br/>
                <p>when did you eat? </p>
                    {eatTimePicker}
                <br/>
                <input type='text' onChange={this.changeFood} />
                 <br/>
                <select onClick={this.foodSelect}>
                    {foodOptions}         
                </select>
                 <p>{this.state.food}</p>
                 <Button variant="primary" size="lg" onClick={this.addTrkFood} block variant="success">Add food </Button>


                 <br/>
                 <p>when did you feel symptoms? </p>
                    {sympTimePicker}
                <br/>
                <input type='text' onChange={this.changeSymptom} />
                 <br/>
                <select onClick={this.symptomSelect}>
                    {symptomOptions}         
                </select>
                 <p>{this.state.symptom}</p>
                 <Button variant="primary" size="lg" onClick={this.addTrkSymptom} block variant="success">Add symptom </Button>


            </div>
        );
    }
}

export default PntTrackingPage;