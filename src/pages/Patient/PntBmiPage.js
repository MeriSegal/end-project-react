import React, { Component } from 'react';
import PntNavBar from '../../components/PntNavBar';
import { Redirect } from 'react-router-dom';
import BmiView from '../../components/BmiView';
import { Form , Col, Row, Button } from 'react-bootstrap';
import './PntBmiPage.css';
import Parse from 'parse';
import moment from 'moment';
import {Line} from 'react-chartjs-2';
import WeightModel from '../../model/WeightModel';

class PntBmiPage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            weightInput: this.props.activeUser.weight,
            updateTime: "",
            graphUpdate: []
        }    
    }

    componentDidMount(){
        const WeightTracking = Parse.Object.extend('WeightTracking');
        const query = new Parse.Query(WeightTracking);
        query.equalTo("UserId", Parse.User.current());    
        query.find().then((results) => { 
            this.setState({
                updateTime: results.reverse()[0].get("date")
            })   
            console.log('WeightTracking found', results[0].get("date"));
        }, (error) => {
            console.error('Error while fetching WeightTracking', error);
        });

        this.updateGraph() 
    }

    updateWeight = () =>{
        const {weightInput} = this.state;

        const User = new Parse.User();
        const query = new Parse.Query(User);
        
        // Finds the user by its ID
        query.get(Parse.User.current().id).then((user) => {
          // Updates the data we want      
          user.set('weight', Number( weightInput));        
          // Saves the user with the updated data
          user.save().then((response) => {
            console.log('Updated user', response);
          }).catch((error) => {
            console.error('Error while updating user', error);
          });
        });

        const WeightTracking = Parse.Object.extend('WeightTracking');
        const myNewObject = new WeightTracking();
        
        myNewObject.set('UserId', Parse.User.current());
        myNewObject.set('pntId', Parse.User.current().id+"");
        myNewObject.set('date',  moment().format("DD-MM-YYYY"));
        myNewObject.set('weight', weightInput);
        
        myNewObject.save().then(
            (result) => {
                this.setState({
                    updateTime: moment().format("DD-MM-YYYY")
                }) 
                this.updateGraph() 
            console.log('WeightTracking created', result);
            },
            (error) => {
            console.error('Error while creating WeightTracking: ', error);
            }
        );
    }

    updateGraph = () =>{

        const WeightTracking = Parse.Object.extend('WeightTracking');
        const query = new Parse.Query(WeightTracking);
        query.equalTo("pntId", Parse.User.current().id);    
        query.find().then((results) => { 
            this.setState({
                graphUpdate: results.map(result => new WeightModel(result))
            })   
            console.log('WeightGraph found', results);
        }, (error) => {
            console.error('Error while fetching WeightTracking', error);
        });
    }

    render() {
        const { activeUser, handleLogout } = this.props;
        const {updateTime, weightInput, graphUpdate} = this.state;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        let weightArr = []   
        let dateArr = [] 
        
        for (let i= 0; i<graphUpdate.length; i++){     
            dateArr.push(graphUpdate[i].date)
            weightArr.push(graphUpdate[i].weight)        
        }
      
        const data = {
          labels: dateArr,
          datasets: [
            {
              label: 'Weight', fill: false, lineTension: 0.5, backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(42, 38, 105)', borderCapStyle: 'butt', borderDash: [], borderDashOffset: 0.0,
              borderJoinStyle: 'miter', pointBorderColor: 'rgba(75,192,192,1)', pointBackgroundColor: '#fff',
              pointBorderWidth: 1, pointHoverRadius: 5, pointHoverBackgroundColor: 'rgba(136, 196, 163, 0.822)',
              pointHoverBorderColor: 'rgba(220,220,220,1)', pointHoverBorderWidth: 2, pointRadius: 3,
              pointHitRadius: 10, data: weightArr
            }
          ]
        };

        return (
            <div className="fillScr">
               <PntNavBar handleLogout={handleLogout}/>

               <div className="g-con col-lg-5">
                    <Form className="bmi-form">
                            <Form.Group as={Row} controlId="formHorizontalWeight">
                                <Form.Label column sm={4}>
                                Weight:
                                </Form.Label>
                                <Col sm={8}>
                                    <Form.Control type="number" min="40" step="0.1" value={weightInput} placeholder={activeUser.weight} onChange={(e) => this.setState({weightInput: e.target.value})}/>
                                </Col>
                            </Form.Group>

                            <Form.Group>
                                <Button variant="primary" size="lg" onClick={this.updateWeight} block variant="success">Update Weight </Button>
                            </Form.Group>
                    </Form>

                    <div className="weight-graph">
                            <Line data={data} />
                    </div>
               </div>
                <div className="bmi-view col-lg-5">
                    <BmiView userName={activeUser.fname+" "+activeUser.lname}  pntHeight={activeUser.height} pntWeight={weightInput} pntIsMale={activeUser.ismale} updateTime={updateTime}/>
                </div>
                             
            </div>
        );
    }
}

export default PntBmiPage;