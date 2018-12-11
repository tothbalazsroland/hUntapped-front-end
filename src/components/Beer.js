import React from "react";

export class Beer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            beer: {},
            isLoading: true,
            beerId:this.props.match.params.id
        }
    }

    componentDidMount(){
        this.setState( {isLoading: true});
        const url = "http://192.168.162.37:8080/api/beer/"+this.state.beerId;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState( {beer: data, isLoading:false}))
    }

    render() {
        const isLoading = this.state.isLoading;
        const beer = this.state.beer;
        if (isLoading){
            return <h1 align="center">Loading....</h1>
        }
        else
        return (
            <div className="card">
            <div className="card-body">
                <h5 className="card-title"><a href={"/beer/"+beer.id}>{beer.name}</a></h5>
                <p className="brewery-name"> {beer.brewery}</p>
                <p className="beer-style"> {beer.type}</p>
                <p className="card-text">{beer.description}</p>
                <table className="table table-bordered">
                    <tbody>
                    <tr>
                        <td className="ABV"> {beer.abv} % ABV</td>
                        <td className="IBU">{beer.ibu} IBU</td>
                        <td className="rating"> Rating: {beer.rating} </td>
                        <td className="numberofratings">{beer.numberOfRatings} Ratings</td>
                    </tr>
                    </tbody>
                </table>
            </div>
                <h1 align="center"> Check-ins:</h1>
                <p align="center"> No Check-ins yet!</p>
            </div>
        );
    }

}