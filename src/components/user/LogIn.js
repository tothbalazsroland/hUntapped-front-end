import React from 'react';
import * as jwt_decoder from "jwt-decode";
import { Redirect } from 'react-router-dom'
import {Navbar} from "../Navbar";
import {getUrl} from "../ApiUrl";

export class LogIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password:"",
            redirect: false
        };

        this.logIn = this.logIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }



    logIn(){

        const user = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(user);
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        const options ={
            method: 'POST',
            headers,
            body: JSON.stringify(user),
        };

        const request = new Request(getUrl()+'api/user/login',options);
        fetch(request)
            .then(response => response.json()
                .then(data => {
                    console.log(data);
                    try{
                        const user = jwt_decoder(data.response);
                        console.log(user.sub);
                        sessionStorage.setItem("username", user.sub);
                        sessionStorage.setItem("token", data.response);
                        this.setState({redirect: true});

                    }catch (e) {
                        alert("invalid username or password");
                    }


                }));
    }

    render(){
        if (this.state.redirect === true) {
            return <Redirect to="/beers"/>
        }else
        return <div>
            <Navbar/>
            <div className="card">
                <div className="card-body">
                    <div className="row justify-content-md-center">
                        <div className="col-30%">
                            <label>Username: </label><br/>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-30%">
                            <input type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="row justify-content-md-center">
                        <div className="col-30%">
                            <label>Password: </label><br/>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-30%">
                            <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <button type="button" className="btn btn-dark" onClick={()=> {this.logIn()}}>Log in</button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="invalidLoginModal" tabIndex="-1" role="dialog"
                 aria-labelledby="invalidLoginModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="invalidLoginModalLabel">Error!</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Username or Password was incorrect!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>

    }
}