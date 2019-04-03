import React from 'react';

export class VenueSearchResultForCheckin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            venues: this.props.venues
        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({venues: nextProps.venues})
    }

    render() {
        var venues = this.state.venues;
        return <div> {venues.map( (venue,key) => <div>{venue.name}</div>)} </div>;
    }

}