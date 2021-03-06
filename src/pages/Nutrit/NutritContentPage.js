import React, { Component } from 'react';
import NutritNavBar from '../../components/NutritNavBar';
import { Redirect } from 'react-router-dom';
import Parse from 'parse';
import { Form, Col, Row, Button, Image } from 'react-bootstrap';

class NutritContentPage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            titleInput: "",
            subTitleInput: "",
            contentInput: "",
            imgInput: null,
            goHome: false
        }    
    }

    addNewContent = () =>{
        const { titleInput, subTitleInput, contentInput, imgInput } = this.state;

        if (titleInput!=="" && subTitleInput!=="" && contentInput!=="" && imgInput!==null){
            const HomeContent = Parse.Object.extend('HomeContent');
            const myNewObject = new HomeContent();

            myNewObject.set('title', titleInput);
            myNewObject.set('subTitle', subTitleInput);
            myNewObject.set('content', contentInput);
            myNewObject.set('image', new Parse.File(imgInput.name, imgInput));

            myNewObject.save().then(
            (result) => {
                this.setState({
                    goHome: true
                });
                console.log('HomeContent created', result);
            },
            (error) => {
                console.error('Error while creating HomeContent: ', error);
            }
            );
        }else{
            alert("Empty content");
        }
    }

    handleFileChange = (event) => {

        if (event.target.files[0]) {
            this.setState({
                imgInput: event.target.files[0]
            });
        } else {
            this.setState({
                imgInput: null
            });
        }
    }

    render() {
        const { activeUser, handleLogout } = this.props;
        const { titleInput, subTitleInput, contentInput, imgInput, goHome } = this.state;

        if (!activeUser || goHome) {
            return <Redirect to="/" />
        }

        const imgURL = imgInput ? URL.createObjectURL(imgInput) : "";

        return (
            <div>
                <NutritNavBar handleLogout={handleLogout} />

               <h1 className="form-title">Add Content to the home Page</h1>
                
                <Form> 
                    <Form.Group as={Row} controlId="title">
                        <Form.Label column sm={2}>
                            Title:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" maxlength="30" placeholder="Title (Up to 30 letters)" value={titleInput} onChange={(e) => this.setState({titleInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="sub">
                        <Form.Label column sm={2}>
                            Sub Title:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" maxlength="100" placeholder="Sub Title (Up to 100 letters)" value={subTitleInput} onChange={(e) => this.setState({subTitleInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="content">
                        <Form.Label column sm={2}>
                            Content:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="textarea" rows="3" type="text" maxlength="380" placeholder="content (Up to 380 letters)" value={contentInput} onChange={(e) => this.setState({contentInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="img">
                        <Form.Label column sm={2}>
                            Image:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="file" accept="image/*" onChange={this.handleFileChange} />
                        </Col>
                    </Form.Group>
                    <Image src={imgURL} className="preview" />

                    <Form.Group>
                        <Button variant="primary" size="lg" onClick={this.addNewContent} block variant="success">Add content </Button>
                    </Form.Group>
                </Form>

            </div>
        );
    }
}

export default NutritContentPage;