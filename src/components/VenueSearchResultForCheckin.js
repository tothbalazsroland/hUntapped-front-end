import React from 'react';

export class VenueSearchResultForCheckin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            venues: this.props.venues,
            selectedVenue: null
        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({venues: nextProps.venues})
    }

    render() {
        if(this.state.selectedVenue){
            return <div>{this.state.selectedVenue}</div>
        }
        var venues = this.state.venues;
        return <div>{venues.map( (venue,key) => <div >{venue.name}</div>)} </div>;
    }

}