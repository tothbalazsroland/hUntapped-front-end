import React from 'react';
import {Navbar} from "../Navbar";

export class LogInFailed extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={"warn"}>
                <h3>Invalid username/password!</h3>
            </div>
        );
    }

}