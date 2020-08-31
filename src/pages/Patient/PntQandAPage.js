import React, { Component } from 'react';
import PntNavBar from '../../components/PntNavBar';
import { Redirect } from 'react-router-dom';
import { ListGroup, Form, Button } from 'bootstrap-4-react';
import Parse from 'parse';
import MessageModel from '../../model/MessageModel';
import moment from 'moment';
import './PntQandAPage.css'


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
        myNewObject.set('pntId', Parse.User.current().id);
        myNewObject.set('content', messageInput);
        myNewObject.set('isNutrit', false);
        myNewObject.set('isRead', false);
        myNewObject.set('date', moment().format("DD-MM-YYYY"));
        myNewObject.set('time', moment().format("h:mm a"));

        myNewObject.save().then( result => {
            this.setState({
                messageInput: ""
            })
            this.showMesages()
        },
        (error) => {
            console.error('Error while creating Message: ', error);
        });
    }


    showMesages = ()=>{

        const Message = Parse.Object.extend('Message');
        const query = new Parse.Query(Message);
        query.equalTo("pntId", Parse.User.current().id);      
        query.find().then(results => {    
            const messages = results.map(result => new MessageModel(result))    
            this.setState({
                messageList: messages
            });
            console.log('Message found', results);
        }, (error) => {
            console.error('Error while fetching Message', error);
        });
    }

    componentDidMount(){
        this.showMesages();
    }
    

    render() {
        const { activeUser, handleLogout } = this.props;
        const { messageInput, messageList} = this.state;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        const messagesList = messageList.reverse().map(msg => 
            <ListGroup.Item className={msg.isNutrit? "list-item-ans":"list-item-ask"}>
               {msg.date}:  {msg.time}: {msg.content}
            </ListGroup.Item>
        )
        
        return (
            <div>
                <PntNavBar handleLogout={handleLogout}/>

                <Form className="chat-form">
                    <Form.Group>                      
                        <label htmlFor="Textarea"> Ask Nutrit:</label>
                        <Form.Textarea id="Textarea" rows="3" type="text" value={messageInput} onChange={(e) => this.setState({messageInput: e.target.value})}></Form.Textarea>
                    </Form.Group>

                    <Form.Group >
                        <Button className="chat-btn" variant="primary" size="lg" onClick={this.sendMessage} block variant="success">Send Message </Button>
                    </Form.Group>
                </Form>
                <ListGroup  className="fillScr, group">
                    {messagesList}                   
                </ListGroup>

            </div>
        );
    }
}

export default PntQandAPage;