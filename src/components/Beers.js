import React from "react";
import {Navbar} from "./Navbar"
export class Beers extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            beers: [],
            isLoading: true
        }
    }


    componentDidMount(){
        this.setState( {isLoading: true});

        fetch("http://192.168.162.37:8080/api/beers")
            .then(response => response.json())
            .then(data => this.setState( {beers: data, isLoading:false}))
    }

    render() {
        const isLoading = this.state.isLoading;
        const beers = this.state.beers;
        if (isLoading){
            return <h1 align="center">Loading....</h1>
        }
        else
            return<div>
                    <Navbar/>
                <div className="container ">
                    <div className="main">
                        <div><h2 align="center">Beers</h2></div>
                        { beers.map((beer, key) => <div key={beer.id} className="card">
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
                        </div>)}
                    </div>
                </div>
                </div>
    }

}