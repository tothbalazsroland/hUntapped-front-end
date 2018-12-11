import React from "react";

export class Brewery extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            brewery: {},
            isLoading: true,
            breweryId:this.props.match.params.id
        }
    }

    componentDidMount(){
        this.setState( {isLoading: true});
        const url = "http://192.168.162.37:8080/api/brewery/"+this.state.breweryId;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState( {brewery: data, isLoading:false}))
    }

    render() {
        const isLoading = this.state.isLoading;
        const brewery = this.state.brewery;
        if (isLoading){
            return <h1 align="center">Loading....</h1>
        }
        else
            return (
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title"><a href={"/brewery/"+brewery.id}>{brewery.name}</a></h5>
                    <p className="brewery-name"> {brewery.country}</p>
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td className="rating"> Rating: {brewery.rating} </td>
                            <td className="numberofratings">{brewery.numberOfRatings} Ratings</td>
                        </tr>
                        </tbody>
                    </table>
                    <p className="description">{brewery.description}</p>
                </div>
                    <h1 align="center"> Check-ins:</h1>
                    <p align="center"> No Check-ins yet!</p>
                </div>
            );
    }
}