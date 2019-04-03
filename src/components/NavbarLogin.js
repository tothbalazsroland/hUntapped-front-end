import React from 'react';
import {getUrl} from "./ApiUrl";
import * as jwt_decoder from "jwt-decode";
import ReactModal from 'react-modal';
import {LogInFailed} from "./user/LogInFailed";
import Modal from "react-bootstrap/Modal";
import {Redirect} from "react-router-dom";



export class NavbarLogin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            isLoggedIn:false,
            loginFailed:false,
            user:null,
            showModal: false,
            isLogout: false
        };
        this.logIn = this.logIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.logout = this.logout.bind(this);
        this.logIn = this.logIn.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    componentDidMount(){
        if (localStorage.getItem("token")) {
            let userToken = jwt_decoder(localStorage.getItem("token"));
            this.setState({isLoggedIn:true, user:userToken.sub})
        }
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    logIn(){
        const user = {
            username: this.state.username,
            password: this.state.password
        };
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
                        localStorage.setItem("token", data.response);
                        this.setState({user: user.sub});
                        this.setState({isLoggedIn: true})
                        window.location.reload();
                    }catch (e) {
                        this.setState({loginFailed: true});
                        this.setState({showModal:true})
                    }
                }));
    }

    logout(){
        localStorage.clear();
        this.setState({isLoggedIn:false, user:null,username:"",password:"",isLogout:true,})
    }

    render() {
        if (this.state.isLogout){
            return <Redirect to="/redirecter"/>
        }
        let smClose = () => this.setState({ showModal: false });
        if (this.state.isLoggedIn){
            return(
                <div className="row brightColor ml-auto">
                    <span className="padding2px">Welcome {this.state.user}</span>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={this.logout}>Log out</button>
                </div>
            );
        }else
        return (
            <div className="row ml-auto brightColor">
                <span className="padding2px">Username:  </span>
                <input type="text" name="username" placeholder="username" onChange={this.handleChange}/>
                <span className="padding2px">Password:  </span>
                <input type="password" name="password" placeholder="password" onChange={this.handleChange}
                       onKeyPress={event => {
                                        if (event.key === 'Enter') {
                                            this.logIn();
                                        }
                }}/>
                <button type="button" className="btn btn-secondary btn-sm" onClick={this.logIn}>Log in</button>
                <Modal
                    className="redColor"
                    size="sm"
                    show={this.state.showModal}
                    onHide={smClose}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm">
                            Error signing in!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Invalid username and/or password!</Modal.Body>
                </Modal>
            </div>
        );
    }

}