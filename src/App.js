import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import {User} from "./components/user/User.js";
import {Home} from "./components/Home.js";
import {Beers} from "./components/beer/Beers.js";
import {Venues} from "./components/venue/Venues.js";
import {Breweries} from "./components/brewery/Breweries";
import {Beer} from "./components/beer/Beer";
import {Brewery} from "./components/brewery/Brewery";
import {Venue} from "./components/venue/Venue";
import {Search} from "./components/Search"
import {Register} from "./components/user/Register";

/*import logo from './logo.svg';*/
import './style/App.css';
import {LogIn} from "./components/user/LogIn";
import {Checkin} from "./components/Checkin";
import {Redirecter} from "./components/Redirecter";

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
                <Route exact path="/redirecter" component={Redirecter}/>
            </div>
        </Router>
    );
  }
}

export default App;
