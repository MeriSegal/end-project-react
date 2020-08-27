import React, { Component } from 'react';

class BmiView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
        }    
    }

    render() {
        const {activeUser} = this.props;

        const ht = activeUser.height*activeUser.height
        const bmi = (activeUser.weight/ht).toFixed(1)

        return (
            <div>
               BMI : {bmi}
            </div>
        );
    }
}

export default BmiView;