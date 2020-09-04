import React, { Component } from 'react';
import { Button, Form, Col, Row} from 'react-bootstrap';
import Parse from 'parse';
import { Redirect } from 'react-router-dom';
import UserModel from '../../model/UserModel';
import '../form.css'
import moment from 'moment';


class PntSignUpPage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            fnameInput: "",
            lnameInput: "",
            emailInput: "",
            phoneInput: "",
            pwdInput: "",
            birthdayInput: "",
            heightInput: "",
            weightInput: "",
            isMale: false,
            redirectToPnt: false 
        }    
    }

    signUp = () =>{
        const {fnameInput, lnameInput, emailInput, phoneInput, pwdInput, birthdayInput, heightInput, weightInput, isMale} = this.state;
        const { handleLogin } = this.props;

        const user = new Parse.User()

        user.set('username',  fnameInput+" "+lnameInput);
        user.set('email', emailInput);
        user.set('phone', phoneInput);
        user.set('fname', fnameInput);
        user.set('lname', lnameInput);
        user.set('birthday', birthdayInput);
        user.set('height', Number(heightInput));
        user.set('weight', Number(weightInput));
        user.set('isMale', isMale);
        user.set('isnutrit', false);
        user.set('password', pwdInput);
        

        user.signUp().then((user) => {
            handleLogin(new UserModel(user));
            this.updateWeight();           
        }).catch(error => {
            console.error('Error while signing up user', error);
        });

    }

    updateWeight = () =>{
        const {weightInput} = this.state;

        const WeightTracking = Parse.Object.extend('WeightTracking');
        const myNewObject = new WeightTracking();
        
        myNewObject.set('UserId', Parse.User.current());
        myNewObject.set('pntId', Parse.User.current().id+"");
        myNewObject.set('date', moment().format("DD-MM-YYYY"));
        myNewObject.set('weight', weightInput);
        
        myNewObject.save().then(
            (result) => {
                this.setState({                
                    redirectToPnt: true
                })
            console.log('WeightTracking created', result);
            },
            (error) => {
            console.error('Error while creating WeightTracking: ', error);
            }
        );
    }

    render() {

        const {redirectToPnt, fnameInput, lnameInput, emailInput, phoneInput, pwdInput, birthdayInput, heightInput, weightInput, isMale} = this.state;
        
        if (redirectToPnt) {
            return <Redirect to="/ptr" />
        }
       
        return (
            <div>
                <h1 className="from-title">Sign Up</h1>
                
                <Form className="fillScr"> 
                    <Form.Group as={Row} controlId="formHorizontalText">
                        <Form.Label column sm={2}>
                            Name:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Name" value={fnameInput} onChange={(e) => this.setState({fnameInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalText">
                        <Form.Label column sm={2}>
                            Last Name:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Last name" value={lnameInput} onChange={(e) => this.setState({lnameInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalText">
                        <Form.Label column sm={2}>
                            Phone:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Phone" value={phoneInput} onChange={(e) => this.setState({phoneInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" value={emailInput} onChange={(e) => this.setState({emailInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" value={pwdInput} onChange={(e) => this.setState({pwdInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalDate">
                        <Form.Label column sm={2}>
                            Birthday:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="date" placeholder="Birthday" value={birthdayInput} onChange={(e) => this.setState({birthdayInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalNumbr">
                        <Form.Label column sm={2}>
                            Height:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="number" min="120" value={heightInput} onChange={(e) => this.setState({heightInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalNumbr">
                        <Form.Label column sm={2}>
                            Weight:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="number" min="40" value={weightInput} onChange={(e) => this.setState({weightInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} >
                        <Form.Label as="legend"> Gender: </Form.Label>

                        <Col sm={12}>
                            <Form.Check type="checkbox" inline label="Female" checked={isMale? false:true} onChange={() => this.setState({isMale: false})}/>
                            <Form.Check type="checkbox" inline  label="Male" checked={isMale? true:false} onChange={() => this.setState({isMale: true})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" size="lg" onClick={this.signUp} block variant="success">SignUp </Button>
                    </Form.Group>
                </Form>

            </div>
        );
    }
}

export default PntSignUpPage;