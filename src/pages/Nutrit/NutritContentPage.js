import React, { Component } from 'react';
import NutritNavBar from '../../components/NutritNavBar';

class NutritContentPage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
        }    
    }
    
    render() {
        return (
            <div>
                <NutritNavBar/>
               Nutrit Content Page 
            </div>
        );
    }
}

export default NutritContentPage;