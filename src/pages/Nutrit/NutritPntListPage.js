import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NutritNavBar from '../../components/NutritNavBar';
import { ListGroup } from 'react-bootstrap';
import Parse from 'parse';
import UserModel from '../../model/UserModel';

class NutritPntListPage extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
            pntList: [],
            pntId: -1
        }
    }

    async componentDidMount() {
       
        const User = new Parse.User();
        const query = new Parse.Query(User); 
        query.equalTo("isnutrit", false);
        const results = await query.find();
        const patients = results.map(result => new UserModel(result));
        this.setState({
            pntList: patients
        });
        
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
        
        if (pntId !== -1) {
            const redirectPath = `/nptr/${pntId}`
            return <Redirect to={redirectPath}/>
        }


        const pnts = pntList.map(pnt => 
            <ListGroup.Item action value={pnt.fname+" "+pnt.lname} onClick={this.viewPnt}>
                {pnt.fname} {pnt.lname}
            </ListGroup.Item>
        )

        return (
            <div >
                <NutritNavBar handleLogout={handleLogout} />

               <ListGroup>
                   {pnts}                   
               </ListGroup>
               
            </div>
        );
    }
}

export default NutritPntListPage;