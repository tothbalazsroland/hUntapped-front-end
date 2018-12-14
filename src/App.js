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

class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Route path="/login" component={LogIn}/>
                <Route path="/user/:userId" component={User}/>
                <Route exact path="/" component={Home}/>
                <Route path="/beers" component={Beers}/>
                <Route path="/venues" component={Venues}/>
                <Route path="/breweries" component={Breweries}/>
                <Route path="/beer/:id" component={Beer}/>
                <Route path="/brewery/:id" component={ Brewery}/>
                <Route path="/venue/:id" component={Venue}/>
                <Route path="/search" component={Search}/>
                <Route path="/register" component={Register}/>
            </div>
        </Router>
    );
  }
}

export default App;
