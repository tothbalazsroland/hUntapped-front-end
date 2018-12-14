import React from "react"
import fb from "./img/fb.png";




export class VenueSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            venues: [],
            searchTerm: this.props.nameChunk,
            isLoading: true
        };
    };

    sendSearch(nameChunk) {
        const url = "http://192.168.162.37:8080/api/venue/search=" + nameChunk;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({venues: data, isLoading: false})
            });
    }



    componentDidMount() {
        this.setState( {isLoading: true});
        this.sendSearch(this.props.nameChunk);
    }

    // IMPORTANT!! at this function use the nextProps, thats the new one!
    componentWillReceiveProps(nextProps) {
        // cc ip: 192.168.162.37
        this.setState({venues: null});
        this.sendSearch(nextProps.nameChunk);
    }





    render() {
        const venues = this.state.venues;
        if (venues !== null && venues.length !== 0) {
            return <div className="main">
                <div><h2 align="center">Venues</h2></div>
                { venues.map((venue, key) => <div key={venue.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title"><a href={"/venue/"+venue.id}>{venue.name}</a><a href={venue.facebookLink}> <img alt="" className="facebookImg" src={fb}/></a></h5>
                        <p className="type">{venue.type}</p>
                        <p className="brewery-name"> {venue.country}, {venue.address}</p>
                        <p className="card-text">{venue.phoneNumber}</p>
                    </div>
                </div>)}
            </div>
        } else {
            return <h2>Couldn't find venue with {this.props.nameChunk}.</h2>;
        }
    }

}