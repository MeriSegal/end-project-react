import React, { Component } from 'react';
import Parse from 'parse';
import WeightModel from '../model/WeightModel';



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

    const tmp = weightTracking.map(tr => 
            <h5>  {tr.date} weight {tr.weight} </h5>
      )

    return (
      <div>
        {tmp}
      </div>
    );
  }
}

export default WeightGraph;