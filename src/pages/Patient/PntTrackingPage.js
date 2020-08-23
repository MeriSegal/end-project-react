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
        }    
    }
    

    onTimeChange = (value)=> {
        console.log(value && value.format(this.format));
    }




    // {
    //     "appId":"c8b48530",
    //     "appKey":"5e2d6b3c85e811a8fcb0b5a800847d78",
    //     "filters":{
    //       "not":{
    //        "item_type":2
    //       }
    //     }
    //   }
   

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


        return (
            <div>
                <PntNavBar/>
                Pnt Tracking Page
                <br/>
                {timePicker}
            </div>
        );
    }
}

export default PntTrackingPage;