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
