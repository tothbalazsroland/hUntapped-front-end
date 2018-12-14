import React from "react";
import fb from "./img/fb.png";
import {Navbar} from "./Navbar";

export class Venues extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            venues: [],
            isLoading: true
        }
    }


    componentDidMount(){
        this.setState( {isLoading: true});

        fetch("http://localhost:8080/api/venues")
            .then(response => response.json())
            .then(data => this.setState( {venues: data, isLoading:false}))
    }

    render() {
        const isLoading = this.state.isLoading;
        const venues = this.state.venues;
        if (isLoading){
            return <h1 align="center">Loading....</h1>
        }
        else
            return<div>
            <Navbar/>
            <div className="container ">
                <div className="main">
                    <div><h2 align="center">Venues</h2></div>
                    { venues.map((venue, key) => <div key={venue.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title"><a href={"/venue/"+venue.id}>{venue.name}</a><a href={venue.facebookLink}> <img className="facebookImg" src={fb}/></a></h5>
                            <p className="type">{venue.type}</p>
                            <p className="brewery-name"> {venue.country}, {venue.address}</p>
                            <p className="card-text">{venue.phoneNumber}</p>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>

    }
}