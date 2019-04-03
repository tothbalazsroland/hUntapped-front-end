import React from "react";
import {Navbar} from "../Navbar";
import fb from "../img/fb.png";
import {CheckinList} from "../CheckinList";
import {getUrl} from "../ApiUrl";

export class User extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        const userName = window.location.href.slice(27);
        console.log(userName);
        const url = getUrl()+"api/user/name="+userName;

        fetch(url)
            .then(response => response.json())
            .then(data => this.setState( {user: data}))
    }

    render() {
        if (this.state.user != null) {
            return (
                <div>
                    <Navbar/>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{this.state.user.name}</h5>
                            <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <td className="numberofratings">{this.state.user.totalCheckIns} Ratings</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <h1 align="center"> Check-ins:</h1>
                        <CheckinList sectionType="user" id={this.state.user.id}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div><h1 align="center">Loading...</h1></div>
            );
        }
    }
}