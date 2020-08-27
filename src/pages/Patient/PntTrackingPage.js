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
            date: moment().format("DD-MM-YYYY"),
            food: "",            
            foodInput: "",
            foodList: [],
            symptom: "",
            symptomInput: "",
            symptomList: []
        }    
    }
    

    onTimeChange = (value)=> {
        console.log(value && value.format(this.format));
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

        const timePicker = <TimePicker
                            showSecond={false}
                            defaultValue={moment()}
                            className="xxx"
                            onChange={this.onTimeChange}
                            format={this.format}
                            use12Hours
                            inputReadOnly
                        />

    

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
                <h1> date: {this.state.date}</h1>
                <p>when did you eat? </p>
                {timePicker}
                <br/>
                <input type='text' onChange={this.changeFood} />
                 <br/>
                <select onClick={this.foodSelect}>
                    {foodOptions}         
                </select>
                 <p>{this.state.food}</p>
                 <Button variant="primary" size="lg" onClick={this.addTrFood} block variant="success">Add food </Button>



                 <p>when did you feel symptoms? </p>
                {timePicker}
                <br/>
                <input type='text' onChange={this.changeSymptom} />
                 <br/>
                <select onClick={this.symptomSelect}>
                    {symptomOptions}         
                </select>
                 <p>{this.state.symptom}</p>
                 <Button variant="primary" size="lg" onClick={this.addTrSymptom} block variant="success">Add symptom </Button>


            </div>
        );
    }
}

export default PntTrackingPage;