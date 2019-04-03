import React from 'react';
import {NavbarLogin} from "./NavbarLogin";


export class Navbar extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            isUserLoggedIn: false,
            username:"",
            password:"",
            reload: false
        };
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount(){
        const token = sessionStorage.getItem("token");
        const username = sessionStorage.getItem("username");
        if (username===null){
            console.log("User not logged in");
        }else{
            this.setState({username:username, isUserLoggedIn: true})
        }
    }

    logOut(){
        sessionStorage.clear();
        this.setState({isUserLoggedIn: false})
        window.location = "http://localhost:3000/";
    }

    render(){
        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">hUntapped</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home<span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/beers">Beers</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/breweries">Breweries</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/venues">Venues</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/search">Search</a>
                    </li>
                    <li className="nav-item registerNavLink">
                        <a className="nav-link" href="/register">Register</a>
                    </li>
                </ul>
                <NavbarLogin/>
            </div>
        </nav>
    }
}

export default Navbar;