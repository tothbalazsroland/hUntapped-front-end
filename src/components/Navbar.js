import React from 'react';
import { Redirect } from 'react-router-dom';


class Navbar extends React.Component{

    constructor(props) {
        super(props);
        this.state ={
            isUserLoggedIn: false,
            username:"",
            reload: false
        };
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount(){
        const token = sessionStorage.getItem("token");
        const username = sessionStorage.getItem("username");
        console.log(token);
        console.log(username);
        if (username===null){
            console.log("NULL")
        }else{
            this.setState({username:username, isUserLoggedIn: true})
        }
    }

    logOut(){
        sessionStorage.clear();
        this.setState({isUserLoggedIn: false})
    }

    render(){
        if (this.state.isUserLoggedIn == true){
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
                        <li className="nav-item" id="logOut">
                            <a className="nav-link" onClick={this.logOut}>Log out</a>
                        </li>
                    </ul>
                </div>
            </nav>
        }else
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
                    <li className="nav-item registerNavLink">
                        <a className="nav-link" href="/register">Register</a>
                    </li>
                    <li className="nav-item" id="logIn">
                        <a className="nav-link" href="/login">Log in</a>
                    </li>
                </ul>
            </div>
        </nav>
    }
}

export default Navbar;