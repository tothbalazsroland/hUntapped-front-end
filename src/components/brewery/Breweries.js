import React from "react";
import {Navbar} from "../Navbar";
import {getUrl} from "../ApiUrl";

export class Breweries extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            breweries:[]
        }
    }

    componentDidMount(){
        this.setState( {isLoading: true});

        fetch(getUrl()+"api/breweries")
            .then(response => response.json())
            .then(data => this.setState( {breweries: data, isLoading:false}))
    }

    render() {
        const isLoading = this.state.isLoading;
        const breweries = this.state.breweries;
        if (isLoading){
            return <div>
                        <Navbar/>
                        <h1 align="center">Loading....</h1>
                    </div>
        }
        else
            return<div>
                <Navbar/>
                <div className="container ">
                    <div className="main">
                        <div><h2 align="center">Breweries</h2></div>
                        { breweries.map((brewery, key) => <div key={brewery.id} className="card">
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
                        </div>)}
                    </div>
                </div>
                </div>

    }

}