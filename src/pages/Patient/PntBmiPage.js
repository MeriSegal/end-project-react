import React, { Component } from 'react';
import PntNavBar from '../../components/PntNavBar';
import { Redirect } from 'react-router-dom';
import BmiView from '../../components/BmiView';
import { Form , Col, Row, Button } from 'react-bootstrap';
import './PntBmiPage.css'

class PntBmiPage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            weightInput: this.props.activeUser.weight,
        }    
    }

    updateWeight = () =>{

    }

    render() {
        const { activeUser, handleLogout } = this.props;
        const { weightInput} = this.state;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        return (
            <div>
               <PntNavBar handleLogout={handleLogout}/>
               <Form className="bmi-form">
                    <Form.Group as={Row} controlId="formHorizontalWeight">
                        <Form.Label column sm={4}>
                           Weight:
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="number" min="40" value={weightInput} placeholder={activeUser.weight} onChange={(e) => this.setState({weightInput: e.target.value})}/>
                        </Col>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" size="lg" onClick={this.updateWeight} block variant="success">Update Weight </Button>
                    </Form.Group>
               </Form>
               <BmiView className="bmi-view" userName={activeUser.fname+" "+activeUser.lname}  pntHeight={activeUser.height} pntWeight={activeUser.weight} pntIsMale={activeUser.ismale}/>

            </div>
        );
    }
}

export default PntBmiPage;