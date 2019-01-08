import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import {User} from "./components/User.js";
import {Home} from "./components/Home.js";
import {Beers} from "./components/Beers.js";
import {Venues} from "./components/Venues.js";
import {Breweries} from "./components/Breweries";
import {Beer} from "./components/Beer";
import {Brewery} from "./components/Brewery";
import {Venue} from "./components/Venue";
import {Search} from "./components/Search"
import {Register} from "./components/Register";

/*import logo from './logo.svg';*/
import './App.css';
import {LogIn} from "./components/LogIn";
import {Checkin} from "./components/Checkin";

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route exact path="/login" component={LogIn}/>
                <Route exact path="/user/:userId" component={User}/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/beers" component={Beers}/>
                <Route exact path="/venues" component={Venues}/>
                <Route exact path="/breweries" component={Breweries}/>
                <Route exact path="/beer/:id" component={Beer}/>
                <Route exact path="/brewery/:id" component={Brewery}/>
                <Route exact path="/venue/:id" component={Venue}/>
                <Route exact path="/search" component={Search}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/checkin/:id" component={Checkin}/>
            </div>
        </Router>
    );
  }
}

export default App;
