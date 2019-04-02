import React from "react";

export class CheckinBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkin: props.checkin
        };
    }

    componentDidMount() {
    }

    render() {
        const date = new Date(this.state.checkin.date).toString();
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title"><a href={"/beer/"+this.state.checkin.beer.id}>{this.state.checkin.beer.name}</a></h5>
                    <p className="user-name">by {this.state.checkin.user.name}</p>
                    <a href={"/brewery/"+this.state.checkin.beer.brewery.id}>Brewery: {this.state.checkin.beer.brewery.name}</a>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td className="Rating">Rated: {this.state.checkin.rating}</td>
                            <td className="Date">{date}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}