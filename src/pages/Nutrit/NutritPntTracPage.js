import React, { Component } from 'react';
import { withRouter, Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
import BmiView from '../../components/BmiView';

class NutritPntTracPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pntId: ""
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        this.setState({               
            pntId: id
        }); 
    }

    render() {
        const {pntId} = this.state;

        if (pntId === -1) {
            const redirectPath = `/patients`
            return <Redirect to={redirectPath}/>
        }

        return (
            <div>
                Nutrit Pnt Track Page <h1>{pntId}</h1>
                <Button variant="primary" size="lg" onClick={()=>this.setState({pntId: -1})} variant="success">Exit pnt </Button>
                <BmiView className="bmi-view" activeUser={pntId}/>

            </div>
        );
    }
}

export default withRouter(NutritPntTracPage);