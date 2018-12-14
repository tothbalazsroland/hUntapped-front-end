import React from "react";
import fb from "./img/fb.png";
import {Navbar} from "./Navbar";

export class Venue extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            venue: {},
            isLoading: true,
            venueId:this.props.match.params.id
        }
    }

    componentDidMount(){
        this.setState( {isLoading: true});
        const url = "http://localhost:8080/api/venue/"+this.state.venueId;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState( {venue: data, isLoading:false}))
    }

    render() {
        const isLoading = this.state.isLoading;
        const venue = this.state.venue;
        if (isLoading){
            return <h1 align="center">Loading....</h1>
        }
        else
            return (
                <div>
                    <Navbar/>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title"><a href={"/venue/"+venue.id}>{venue.name}</a><a href={venue.facebookLink}> <img alt="" className="facebookImg" src={fb}/></a></h5>
                            <p className="type">{venue.type}</p>
                            <p className="brewery-name"> {venue.country}, {venue.address}</p>
                            <p className="card-text">{venue.phoneNumber}</p>
                        </div>
                        <h1 align="center"> Check-ins:</h1>
                        <p align="center"> No Check-ins yet!</p>
                    </div>
                </div>

            );
    }

}