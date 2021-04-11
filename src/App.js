
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/home';
import FetchData from './components/getData'

class App extends Component {

  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
            <Route path="/" component={Home} exact/>
             <Route path="/getData" component={FetchData} exact/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
