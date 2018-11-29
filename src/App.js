import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import {User} from "./components/User.js";
import {Home} from "./components/Home.js";
import {Beers} from "./components/Beers.js";
import {Venues} from "./components/Venues.js";
import {Breweries} from "./components/Breweries";

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route path="/user/:userId" component={User}/>
                <Route exact path="/" component={Home}/>
                <Route path="/beers" component={Beers}/>
                <Route path="/venues" component={Venues}/>
                <Route path="/breweries" component={Breweries}/>
            </div>
        </Router>
    );
  }
}

export default App;
