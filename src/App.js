import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PntSighUpPage from './pages/Patient/PntSighUpPage';
import NutritPntListPage from './pages/Nutrit/NutritPntListPage';
import NutritPntTracPage from './pages/Nutrit/NutritPntTracPage';
import NutritContentPage from './pages/Nutrit/NutritContentPage';
import PntBmiPage from './pages/Patient/PntBmiPage';
import PntQandAPage from './pages/Patient/PntQandAPage';
import PntTrackingPage from './pages/Patient/PntTrackingPage';
import Parse from 'parse';

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'Y2L3RiP8eXAs3YBIIJ6z8g18McHTHCxC9W8MIf0X', // This is your Application ID
  'wZU5JqoFlUizsekgXZ2KgHXMADWKvylpto4xER53' // This is your Javascript key
);


class App extends React.Component {

  constructor(props) {

      super(props);

      this.state = {
        activeUser: null
      }    
  }

  handleLogin = (activeUser)=> {
    this.setState({
      activeUser: activeUser
    })
  }



  render() { 
    const { activeUser } = this.state;
      
    return (
      <div className="App">
       <HashRouter>
          <Switch>
            <Route exact path="/">             
              <HomePage/>
            </Route>
            <Route exact path="/login">
              <LoginPage activeUser={activeUser} handleLogin={this.handleLogin}/>
            </Route> 
            <Route exact path="/signup">
              <PntSighUpPage/>  
            </Route>
            <Route exact path="/patients">
              <NutritPntListPage/>  
            </Route>  
            <Route exact path="/nptr/:id">
              <NutritPntTracPage/>  
            </Route>  
            <Route exact path="/content">
              <NutritContentPage/>  
            </Route>  
            <Route exact path="/bmi">
              <PntBmiPage/>  
            </Route>  
            <Route exact path="/chat">
              <PntQandAPage/>  
            </Route>  
            <Route exact path="/ptr">
              <PntTrackingPage/>  
            </Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
