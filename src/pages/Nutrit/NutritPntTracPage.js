import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

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
        

        return (
            <div>
                Nutrit Pnt Track Page <h1>{this.state.pntId}</h1>
            </div>
        );
    }
}

export default withRouter(NutritPntTracPage);