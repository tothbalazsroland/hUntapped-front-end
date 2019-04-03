import React from 'react';
import {Redirect} from "react-router-dom";

export class Redirecter extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return <Redirect to="/"/>
    }

}