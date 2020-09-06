import React, { Component } from 'react';
import Parse from 'parse';
import WeightModel from '../model/WeightModel';
import {Line} from 'react-chartjs-2';

class WeightGraph extends Component {

    constructor(props) {
        super(props);

        this.state = {  
            weightTracking: []
        }
    }
  
    componentDidMount(){

        const {pntId} = this.props;
        
        const WeightTracking = Parse.Object.extend('WeightTracking');
        const query = new Parse.Query(WeightTracking);
        query.equalTo("pntId", pntId+"");    
        query.find().then((results) => { 
            this.setState({
                weightTracking: results.map(result => new WeightModel(result))
            })   
            console.log('WeightGraph found', results);
        }, (error) => {
            console.error('Error while fetching WeightTracking', error);
        });

        
    }

  render() {
    const {weightTracking} = this.state;   

    let weightArr = []   
    let dateArr = [] 
    
    for (let i= 0; i<weightTracking.length; i++){     
        dateArr.push(weightTracking[i].date)
        weightArr.push(weightTracking[i].weight)        
    }
      
    const data = {
      labels: dateArr,
      datasets: [
        {
          label: 'Weight',
          fill: false,
          lineTension: 0.5,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(42, 38, 105)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(136, 196, 163, 0.822)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: weightArr
        }
      ]
    };

    return (
        <Line data={data} />
    );
  }
}

export default WeightGraph;