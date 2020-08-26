import React, { Component } from 'react';
import NutritNavBar from '../../components/NutritNavBar';
import { Redirect } from 'react-router-dom';

class NutritContentPage extends Component {

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
                <NutritNavBar handleLogout={handleLogout} />
               Nutrit Content Page 
            </div>
        );
    }
}

export default NutritContentPage;