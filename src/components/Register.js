import React from "react";

export class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

            username: "",
            password: "",
            email: "",
            name: "",
            isRegisterSuccesful: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    }

    sendRegister(){
        const user = {username: this.state.username,
                        password: this.state.password,
                        email: this.state.email,
                        name: this.state.name}
        const headers = new Headers();
        headers.append('Content-Type','application/json');
        const options ={
            method: 'POST',
            headers,
            body: JSON.stringify(user),
        };

        const request = new Request('http://localhost:8080/api/user/register',options);
        fetch(request)
            .then(response => response.json()
                .then(data=>{
                    this.setState({isRegisterSuccesful:data});
                    console.log(data);
                }))
        ;


    }


    render() {
        return (
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
                        <div className="col-30%">
                            <label>Full name: </label><br/>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-30%">
                            <input type="text" name="name" placeholder="Full name" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-30%">
                            <label>E-mail: </label><br/>
                        </div>
                    </div>
                    <div className="row justify-content-md-center">
                        <div className="col-30%">
                            <input type="text" name="email" placeholder="E-mail" onChange={this.handleChange}/>
                        </div>
                    </div>

                    <div className="row justify-content-md-center">
                        <button type="button" className="btn btn-dark" onClick={()=> {this.sendRegister()}}>Register</button>
                    </div>
                </div>
            </div>
        );
    }
}