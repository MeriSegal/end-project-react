import React, { Component } from 'react';
import PntNavBar from '../../components/PntNavBar';
import { Redirect } from 'react-router-dom';
import BmiView from '../../components/BmiView';
import { Form , Col, Row, Button } from 'react-bootstrap';
import './PntBmiPage.css';
import Parse from 'parse';
import moment from 'moment';
import WeightGraph from '../../components/WeightGraph';

class PntBmiPage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            weightInput: this.props.activeUser.weight,
            updateTime: "01-09-2020"
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
            console.log('WeightTracking created', result);
            },
            (error) => {
            console.error('Error while creating WeightTracking: ', error);
            }
        );
    }

    render() {
        const { activeUser, handleLogout } = this.props;
        const {updateTime, weightInput} = this.state;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        return (
            <div className="fillScr">
               <PntNavBar handleLogout={handleLogout}/>

               <Form className="bmi-form">
                    <Form.Group as={Row} controlId="formHorizontalWeight">
                        <Form.Label column sm={4}>
                           Weight:
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="number" min="40" value={weightInput} placeholder={activeUser.weight} onChange={(e) => this.setState({weightInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" size="lg" onClick={this.updateWeight} block variant="success">Update Weight </Button>
                    </Form.Group>
               </Form>

               <BmiView className="bmi-view" userName={activeUser.fname+" "+activeUser.lname}  pntHeight={activeUser.height} pntWeight={weightInput} pntIsMale={activeUser.ismale} updateTime={updateTime}/>
               
               <WeightGraph pntId={Parse.User.current().id}></WeightGraph>

            </div>
        );
    }
}

export default PntBmiPage;