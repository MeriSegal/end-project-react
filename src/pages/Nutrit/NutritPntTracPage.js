import React, { Component } from 'react';
import { withRouter, Redirect } from "react-router-dom";
import BmiView from '../../components/BmiView';
import { ListGroup, Form, Button } from 'bootstrap-4-react';
import Parse from 'parse';
import moment from 'moment';
import UserModel from '../../model/UserModel';
import MessageModel from '../../model/MessageModel';
import TrackingView from '../../components/TrackingView';
import FontAwesome from 'react-fontawesome';
import WeightGraph from '../../components/WeightGraph';

class NutritPntTracPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pntId: "",
            pntName: "",
            pntHeight: "",
            pntWeight: "",
            pntIsMale: "",
            weightUpdateTime: "",
            messageInput: "",
            messageList: []
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        this.setState({
            pntName: id
        })


        {   
            const User = new Parse.User();
            const query = new Parse.Query(User); 
            query.equalTo("username", id);
            query.find().then(results => {    
                const patient = results.map(result => new UserModel(result));
                this.setState({
                    pntId: patient[0].id,
                    pntHeight: patient[0].height,
                    pntWeight: patient[0].weight,
                    pntIsMale: patient[0].ismale
                })
                this.readMessages() 
                this.getWeightUpdateTime()               
            }, (error) => {
                console.error('Error while fetching Message', error);
            });
        }
    }

    getWeightUpdateTime = ()=>{
        const WeightTracking = Parse.Object.extend('WeightTracking');
        const query = new Parse.Query(WeightTracking);
        query.equalTo("pntId", this.state.pntId+"");    
        query.find().then((results) => { 
            this.setState({
                weightUpdateTime: results.reverse()[0].get("date")
            })   
            console.log('WeightTracking found', results[0].get("date"));
        }, (error) => {
            console.error('Error while fetching WeightTracking', error);
        });
    }

    sendMessage = () =>{
        const {messageInput, pntId} = this.state;

        const Message = Parse.Object.extend('Message');
        const myNewObject = new Message();

        myNewObject.set('userId', Parse.User.current());
        myNewObject.set('pntId', pntId+"");
        myNewObject.set('content', messageInput);
        myNewObject.set('isNutrit', true);
        myNewObject.set('isRead', false);
        myNewObject.set('date', moment().format("DD-MM-YYYY"));
        myNewObject.set('time', moment().format("h:mm a"));
        myNewObject.save().then( result => {
            this.setState({
                messageInput: ""
            })
            this.readMessages()
            this.updateMsgStatus()
        },
        (error) => {
            console.error('Error while creating Message: ', error);
        });
    }

    updateMsgStatus = () =>{

        const {messageList} = this.state;
        const Message = Parse.Object.extend('Message')
        messageList.map(msg =>
            new Parse.Query(Message).get(msg.id).then((object) => {          
            object.set('isRead', true);           
            object.save().then((response) => {              
              console.log('Updated Message', response);
            }, (error) => {
              console.error('Error while updating Message', error);
            });
          }))
    }

    readMessages = () =>{
            const {pntId} = this.state;

            const Message = Parse.Object.extend('Message');
            const query = new Parse.Query(Message);
            query.equalTo("pntId", pntId+"");
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




    render() {
        const {pntName, pntId, pntHeight, pntWeight, weightUpdateTime, pntIsMale, messageInput, messageList} = this.state;

        if (pntId === -1) {
            const redirectPath = `/patients`
            return <Redirect to={redirectPath}/>
        }

        let trView = <div></div>
        let trWeight = <div></div>
        if (pntId!==""){
            trView = <TrackingView pntId={pntId}></TrackingView>
            trWeight = <WeightGraph pntId={pntId}></WeightGraph>
        }

        const messagesList = messageList.reverse().map((msg, index) => 
            <ListGroup.Item key={index} className={!msg.isNutrit? "list-item-ans":"list-item-ask"}>
               {msg.date}:  {msg.time}: {msg.content}
            </ListGroup.Item>
        )

        return (
            <div>
                <h1>Tracing {pntName}</h1>
                <Button variant="primary" size="lg" onClick={()=>this.setState({pntId: -1})} variant="success">Back to list 
                <FontAwesome className="fas fa-level-up fa-10x"/> </Button>
               
                {trView}
                
                <div className="weight-graph">
                    {trWeight}
                </div>  

                <BmiView className="bmi-view" userName={pntName}  pntHeight={pntHeight} pntWeight={pntWeight} updateTime={weightUpdateTime} pntIsMale={pntIsMale}/>
                 
                <Form className="chat-form">
                    <Form.Group>                      
                        <label htmlFor="Textarea"> Patient counseling:</label>
                        <Form.Textarea id="Textarea" rows="3" type="text" value={messageInput} onChange={(e) => this.setState({messageInput: e.target.value})}></Form.Textarea>
                    </Form.Group>

                    <Form.Group >
                        <Button className="chat-btn" variant="primary" size="lg" onClick={this.sendMessage} block variant="success">Send Message </Button>
                    </Form.Group>
                </Form>
                <ListGroup className="group">
                      {messagesList}   
                </ListGroup>
                
            </div>
        );
    }
}

export default withRouter(NutritPntTracPage);