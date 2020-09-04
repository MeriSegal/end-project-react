import React, { Component } from 'react';
import { Button, Form, Alert, Col, Row } from 'react-bootstrap';
import Parse from 'parse';
import UserModel from '../model/UserModel';
import { Redirect } from 'react-router-dom';
import './form.css'


class LoginPage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            emailInput: "nur@nur.com",
            pwdInput: "1234",
            showInvalidCredentials: false,
            redirectToPnt: false,
            redirectToNutrit: false

        }    
    }

    login =()=>{
        const { emailInput, pwdInput } = this.state;
        const { handleLogin } = this.props;

        Parse.User.logIn(emailInput, pwdInput).then(user =>{

            handleLogin(new UserModel(user));
            if (user.get("isnutrit")){
                this.setState({                
                    redirectToNutrit: true
                });
            }else{
                this.setState({                
                    redirectToPnt: true
                })
            }            
            
        }).catch(error => {
            // If the login is not valid: show an error alert
            this.setState({
                showInvalidCredentials: true
            })
        });
    }

    render() {
        const { emailInput, pwdInput, showInvalidCredentials, redirectToPnt, redirectToNutrit } = this.state;

        if (redirectToPnt) {
            return <Redirect to="/ptr" />
        }else if(redirectToNutrit){
            return <Redirect to="/patients" />
        }

        return (
            <div>
               <h1 className="from-title">Login</h1>
               <p> or <a href="#/signup">create a new account</a> </p>
                <Form className="fillScr">
                    {showInvalidCredentials ? <Alert variant="danger">
                        Invalid Credientails! Incorrect email or password
                    </Alert> : null}
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Email:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Email" value={emailInput} onChange={(e) => this.setState({emailInput: e.target.value, showInvalidCredentials: false})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" value={pwdInput} onChange={(e) => this.setState({pwdInput: e.target.value, showInvalidCredentials: false})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" size="lg" onClick={this.login} block variant="success">Login </Button>
                    </Form.Group>
                </Form>

            </div>
        );
    }
}

export default LoginPage;