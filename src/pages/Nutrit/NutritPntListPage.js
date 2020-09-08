import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NutritNavBar from '../../components/NutritNavBar';
import { ListGroup, Badge } from 'react-bootstrap';
import Parse from 'parse';
import UserModel from '../../model/UserModel';
import './NutritPntListPage.css'

class NutritPntListPage extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
            pntList: [],
            pntId: -1,          
        }
    }

    async componentDidMount() {
       
        {   
            const User = new Parse.User();
            const query = new Parse.Query(User); 
            query.equalTo("isnutrit", false);
            const results = await query.find();
            const patients = results.map(result => new UserModel(result));
            this.setState({
                pntList: patients
            });
        }


        {
            const Message = Parse.Object.extend('Message');
            const query = new Parse.Query(Message);
            query.equalTo("isNutrit", false);
            query.equalTo("isRead", false);
            const results = await query.find();

            results.map(result =>{
                const newpntList = this.state.pntList.map(v => {
                    return v.id === result.get("userId").id ? {...v, message: v.message+1} : {...v, message: v.message}
                  })
                this.setState({
                    pntList: newpntList
                })
            
            }); 
        }
        
    }

    viewPnt = (event)=>{
        this.setState(
            {pntId: event.target.value}
        );       
    }


    render() {
        const { activeUser, handleLogout } = this.props;
        const {pntList, pntId} = this.state;

        if (!activeUser) {
            return <Redirect to="/" />
        }
        
        if (pntId !== -1 && pntId !== undefined) {
            const redirectPath = `/nptr/${pntId}`
            return <Redirect to={redirectPath}/>
        }


        const pnts = pntList.map((pnt, index) => 
            <ListGroup.Item key={index} className="list-item" action value={pnt.fname+" "+pnt.lname} onClick={this.viewPnt}>
                <Badge className="name-bdg"> <h4> {pnt.fname} {pnt.lname}</h4> </Badge>   phone: {pnt.phone}   &gt;&gt;
                <Badge className="babble"> <h5>{pnt.message===0? "":pnt.message +" new messages"} </h5></Badge>
            </ListGroup.Item>
        )

        return (
            <div className="fillScr">
                <NutritNavBar handleLogout={handleLogout} />

               <ListGroup className="group">
                   {pnts}                   
               </ListGroup>
               
            </div>
        );
    }
}

export default NutritPntListPage;