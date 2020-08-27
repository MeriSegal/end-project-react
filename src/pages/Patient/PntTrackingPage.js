import React, { Component } from 'react';
import PntNavBar from '../../components/PntNavBar';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import FoodModel from '../../model/FoodModel';
import Parse from 'parse';


class PntTrackingPage extends Component {

    constructor(props) {
        super(props);    

        this.format = 'h:mm a';

        this.state = {
            food: "",
            foodInput: "",
            foodList: []
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

    changeHandler = (event) => {
        this.setState(
            {foodInput: event.target.value}
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

    

        const options = this.state.foodList.filter(foods => (foods.foodName).toLowerCase()
                                .includes((this.state.foodInput).toLowerCase()))
                                .map(foodfilter => <option value= {foodfilter.foods} >{foodfilter.foodName}</option>);

        return (
            <div>
                <PntNavBar handleLogout={handleLogout}/>
                Pnt Tracking Page {activeUser.fname}
                <br/>
                {timePicker}
                <br/>
                <input type='text' onChange={this.changeHandler} />
                 <br/>
                <select onClick={this.foodSelect}>
                    {options}         
                </select>
                 <p>{this.state.food}</p>

            </div>
        );
    }
}

export default PntTrackingPage;