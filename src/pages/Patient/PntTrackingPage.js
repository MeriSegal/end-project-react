import React, { Component } from 'react';
import PntNavBar from '../../components/PntNavBar';
import 'rc-time-picker/assets/index.css';
import TimePicker from 'rc-time-picker';
import moment from 'moment';


class PntTrackingPage extends Component {

    constructor(props) {
        super(props);    

        this.format = 'h:mm a';

        this.state = {
            food: "",
            foodInput: ""
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

    render() {
      
        const timePicker = <TimePicker
                            showSecond={false}
                            defaultValue={moment()}
                            className="xxx"
                            onChange={this.onTimeChange}
                            format={this.format}
                            use12Hours
                            inputReadOnly
                        />

        // temp list:
        const foodList =[
            {foodName: "bread toast"},
            {foodName: "chese"},
            {foodName: " light creame chese "},
            {foodName: " light dark bran bread "},
            {foodName: " light dark bread "},
            {foodName: "butter"},
            {foodName: "eggplant"}
            ]; 

        const options = foodList.filter(foods => (foods.foodName).toLowerCase()
                                .includes((this.state.foodInput).toLowerCase()))
                                .map(foodfilter => <option value= {foodfilter.foods} >{foodfilter.foodName}</option>);

        return (
            <div>
                <PntNavBar/>
                Pnt Tracking Page
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