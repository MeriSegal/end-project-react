import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NutritNavBar from '../../components/NutritNavBar';
import { Button } from 'react-bootstrap';

class NutritPntListPage extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
            id: -1
        }
    }

    render() {
        const { activeUser, handleLogout } = this.props;

        if (!activeUser) {
            return <Redirect to="/" />
        }
        
        if (this.state.id !== -1) {
            const redirectPath = `/nptr/${this.state.id}`
            return <Redirect to={redirectPath}/>
        }

        return (
            <div>
                <NutritNavBar handleLogout={handleLogout} />
                <Button onClick={()=>this.setState({id: 1})}>temp go to 1 patient View</Button>
                Nutrit Pnt List Page
            </div>
        );
    }
}

export default NutritPntListPage;