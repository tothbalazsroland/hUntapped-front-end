import React from "react";
import main from "./img/main2.jpg"
import {Navbar} from "./Navbar";


export class Home  extends React.Component{
    render() {
        return (
            <div>
                <Navbar/>
                <div className="mainPage">
                    <img src={main}/>
                </div>
            </div>

        );
    }
}