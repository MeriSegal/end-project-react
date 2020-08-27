import React, { Component } from 'react';
import PntNavBar from '../../components/PntNavBar';
import { Redirect } from 'react-router-dom';
import BmiView from '../../components/BmiView';

class PntBmiPage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
        }    
    }

    render() {
        const { activeUser, handleLogout } = this.props;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        return (
            <div>
               <PntNavBar handleLogout={handleLogout}/>
               Pnt Bmi Page 
               <BmiView activeUser={activeUser}/>

            </div>
        );
    }
}

export default PntBmiPage;