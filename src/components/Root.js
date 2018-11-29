import React from "react";

import {Navbar} from "./Navbar.js"

export class Root extends React.Component{
    render() {
        return (
            <div className="container">
                <div className="row ">
                <Navbar/>
                </div>
            </div>
        );
    }
}