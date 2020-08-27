import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PntSignUpPage from './pages/Patient/PntSignUpPage';
import NutritPntListPage from './pages/Nutrit/NutritPntListPage';
import NutritPntTracPage from './pages/Nutrit/NutritPntTracPage';
import NutritContentPage from './pages/Nutrit/NutritContentPage';
import PntBmiPage from './pages/Patient/PntBmiPage';
import PntQandAPage from './pages/Patient/PntQandAPage';
import PntTrackingPage from './pages/Patient/PntTrackingPage';
import Parse from 'parse';

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'radc71oZRPB1K3RmLNLsQEudRgyRog2XlojqQhBY', // This is your Application ID
  'oGSvQBOeOrb3Zx4a5SyVBul46u6Ic3KnUG6AAGsx' // This is your Javascript key 
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

  handleLogout =()=> {
    this.setState({
      activeUser: null
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
              <LoginPage handleLogin={this.handleLogin}/>
            </Route> 
            <Route exact path="/signup">
              <PntSignUpPage handleLogin={this.handleLogin}/>  
            </Route>
            <Route exact path="/patients">
              <NutritPntListPage activeUser={activeUser} handleLogout={this.handleLogout}/>  
            </Route>  
            <Route exact path="/nptr/:id">
              <NutritPntTracPage activeUser={activeUser} handleLogout={this.handleLogout}/>  
            </Route>  
            <Route exact path="/content">
              <NutritContentPage activeUser={activeUser} handleLogout={this.handleLogout}/>  
            </Route>  
            <Route exact path="/bmi">
              <PntBmiPage activeUser={activeUser} handleLogout={this.handleLogout}/>  
            </Route>  
            <Route exact path="/chat">
              <PntQandAPage activeUser={activeUser} handleLogout={this.handleLogout}/>  
            </Route>  
            <Route exact path="/ptr">
              <PntTrackingPage activeUser={activeUser} handleLogout={this.handleLogout}/>  
            </Route>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
