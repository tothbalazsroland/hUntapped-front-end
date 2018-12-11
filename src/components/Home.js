import React from "react";
import main from "./img/main2.jpg"


export class Home  extends React.Component{
    render() {
        return (
            <div className="mainPage">
                <img src={main}/>
            </div>
        );
    }
}