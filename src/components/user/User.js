import React from "react";

export class User extends React.Component{

    render() {
        return (
            <div>
                <h1>This is User!!!!!{this.props.match.params.userId}</h1>
            </div>
        );
    }
}