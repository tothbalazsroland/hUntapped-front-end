import React from "react";
import {getUrl} from "./ApiUrl";
import {Navbar} from "./Navbar";
import * as jwt_decoder from "jwt-decode";
import {Redirect} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {VenueSearchResultForCheckin} from "./VenueSearchResultForCheckin";


export class Checkin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            loggedIn:true,
            isLoading:true,
            beer:{name:""},
            beerId: this.props.match.params.id,
            rating: 2.5,
            description:"",
            checkinComplete: false,
            showModal: false,
            venueString:"",
            venues:null
        };
        this.onSliderChanged = this.onSliderChanged.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.rateBeer = this.rateBeer.bind(this);
        this.handleVenueInput = this.handleVenueInput.bind(this);
        this.handleSelectVenue = this.handleSelectVenue.bind(this);
    }

    handleSelectVenue(event){
        console.log(event.target.textContent);
    }
    componentDidMount(){
        if (localStorage.getItem("token")!=null) {
            this.setState({loggedIn:true})
        }else{ this.setState({loggedIn:false})}
        this.setState( {isLoading: true});

        const url = getUrl()+"api/beer/id="+this.state.beerId;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState( {beer: data, isLoading:false}))
    }

    onSliderChanged(event){
        this.setState({rating:event.target.value})
    }

    handleChange(event){
        this.setState({description:event.target.value})
    }

    handleVenueInput(event){
        this.setState({venueString:event.target.value});
        if (event.target.value !== "") {
            let url = getUrl() + "api/venue/search=" + event.target.value;
            console.log("Searching for term" + event.target.value);
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.length === 0){
                        this.setState({venues: null})
                    }else {
                        this.setState({venues: data});
                    }
                    console.log(data);
                })
        }else {
            this.setState({venues:null})
        }


    }

    rateBeer(event){
        if (localStorage.getItem("token")!=null){
            const username = jwt_decoder(localStorage.getItem("token")).sub;
            const json = {
                "username":username,
                "description": this.state.description,
                "rating": this.state.rating,
                "beerId": this.state.beerId,
                "venueId": ""
            };
            console.log(json);

            const headers = new Headers();
            headers.append('Content-Type','application/json');
            headers.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
            const options ={
                method: 'POST',
                headers,
                body: JSON.stringify(json),
            };

            const request = new Request(getUrl()+'api/checkin',options);
            fetch(request)
                .then(response => response.json()
                    .then(data=>{
                        if (data!=true){
                            localStorage.clear();
                            this.setState({loggedIn:false})
                            console.log("Invalid token!")
                        }
                        this.setState({checkinComplete:data});
                    }));
        }else {
            this.setState({loggedIn:false});
        }

    }

    render() {
        const rating = this.state.rating;
        const beer = this.state.beer;
        const redirect = this.state.checkinComplete;
        if (redirect){
            return <Redirect to="/beers"/>
        }
        return (
            <div>
                <Navbar/>
                <div className="card">
                    <div className="card-header">
                        Check-in
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{beer.name}</h5>
                        <input className="slider" name="rating" type="range" min="0" max="5" step="0.25" value={rating} onChange={this.onSliderChanged}/>
                        <span>{rating} Stars</span>
                        <br/>
                        <label>Comment:</label>
                        <br/>
                        <textarea className="checkinComment" type="text" value={this.state.description} onChange={this.handleChange} />
                        <br/>
                        <label>Venue(optional):</label>
                        <br/>
                        <input type="text" value={this.state.venueString} onChange={this.handleVenueInput}/>
                        {this.state.venues? this.state.venues.map( (venue,key) => <div onClick={this.handleSelectVenue}>{venue.name}</div>)
                                        :
                                        null
                        }
                        <br/>
                        <a className="btn btn-secondary" onClick={this.rateBeer}>Rate</a>
                    </div>
                </div>
            </div>
        );
    }
}