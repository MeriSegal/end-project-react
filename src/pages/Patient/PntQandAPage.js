import React, { Component } from 'react';
import PntNavBar from '../../components/PntNavBar';
import { Redirect } from 'react-router-dom';
import { ListGroup, Form, Button } from 'bootstrap-4-react';
import Parse from 'parse';


class PntQandAPage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            messageInput: "",
            messageList: []
        }    
    }


    sendMessage = () =>{
        const {messageInput} = this.state;

        const Message = Parse.Object.extend('Message');
        const myNewObject = new Message();

        myNewObject.set('userId', Parse.User.current());
        myNewObject.set('content', messageInput);
        myNewObject.set('isNutrit', false);
        myNewObject.set('isRead', false);

        myNewObject.save().then(
        (result) => {
            console.log('Message created', result);
            this.setState({
                messageInput: ""
            });
        },
        (error) => {
            console.error('Error while creating Message: ', error);
        });

    }
    

    render() {
        const { activeUser, handleLogout } = this.props;
        const { messageInput, messageList} = this.state;


        if (!activeUser) {
            return <Redirect to="/" />
        }



        const messages = messageList.map(msg => 
            <ListGroup.Item className="list-item">
            </ListGroup.Item>
        )
        
        return (
            <div>
                <PntNavBar handleLogout={handleLogout}/>

                <Form>
                    <Form.Group>                      
                        <label htmlFor="Textarea"> Ask Nutrit:</label>
                        <Form.Textarea id="Textarea" rows="3" type="text" value={messageInput} onChange={(e) => this.setState({messageInput: e.target.value})}></Form.Textarea>
                    </Form.Group>

                    <Form.Group >
                        <Button variant="primary" size="lg" onClick={this.sendMessage} block variant="success">Send Message </Button>
                    </Form.Group>
                </Form>
                <ListGroup  className="fillScr, group">
                    <ListGroup.Item className="">
                     17-8-2020: 13:34: yes its ok
                    </ListGroup.Item>
                    <ListGroup.Item className="list-item">
                    16-8-2020: 15:41: can i have dsfgheklfhgd fhskhf
                    </ListGroup.Item>
                </ListGroup>

            </div>
        );
    }
}

export default PntQandAPage;