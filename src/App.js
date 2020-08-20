import React from 'react';
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


class App extends React.Component {

  constructor(props) {
    super(props);
  
}  


  render() {   
    return (
      <div className="App">
       <HashRouter>
          <Switch>
            <Route exact path="/">             
              <HomePage/>
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route> 
            <Route exact path="/signup">
              <PntSighUpPage/>  
            </Route>
            <Route exact path="/patients">
              <NutritPntListPage/>  
            </Route>  
            <Route exact path="/nptr">
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
