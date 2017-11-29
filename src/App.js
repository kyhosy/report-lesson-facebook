import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginContainer from './Containers/LoginContainer';
import LoginComponent from './LoginComponent/LoginComponent';
import FirstStepComponent from './FirstStepComponent/FirstStepComponent';
import BaseStepComponent from './BaseStepComponent/BaseStepComponent';
import FinalStepComponent from './FinalStepComponent/FinalStepComponent';
import isHasToken from './Utils/Utils';
import 'bootstrap/dist/css/bootstrap.css';

// import {Switch, Route,BrowserRouter} from 'react-router-dom';

class App extends Component {


  render() {
    // boolean isExisToken = 

    var top = <LoginComponent/>
    // const checktoken = isHasToken(this.props.authenticateFacebook);

    // if(checktoken)
    {
      var top = (
      <div>
          <LoginComponent/>
      <div className="row row-custom">
        <div className="col-md-4">
          <FirstStepComponent/>
        </div>
        <div className="col-md-4">
          <BaseStepComponent/>
        </div>
        <div className="col-md-4">
          <FinalStepComponent/>
        </div>
      </div>
      </div>)
    };

    

    return  (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {top}
      </div>
    );
  }
}

export default App;
