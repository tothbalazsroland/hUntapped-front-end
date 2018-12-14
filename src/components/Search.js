import React from "react";

import {BeerSearch} from "./BeerSearch";
import {BrewerySearch} from "./BrewerySearch";
import {VenueSearch} from "./VenueSearch";
import {Navbar} from "./Navbar";

export class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            searchTerm: "",
            result: "Nothing yet",
            beerFinder: <h2>Nothing yet!</h2>,
            breweryFinder: <h2>Nothing yet!</h2>,
            venueFinder: <h2>Nothing yet!</h2>
        }
    }



    componentDidMount() {
        this.setState( {isLoading: true});
    }

    findBeers() {
        if (this.state.searchTerm === "") {
            return <h2>Nothing yet!</h2>
        } else {
            console.log("now this is " + this.state.searchTerm);
            let temp = <BeerSearch nameChunk={this.state.searchTerm}/>
            return temp === null ? <h2>There is no beer with that name!</h2> : temp;
        }
    }

    findBreveries() {
        if (this.state.searchTerm === "") {
            return <h2>Nothing yet!</h2>
        } else {
            console.log("now this is " + this.state.searchTerm);
            let temp = <BrewerySearch nameChunk={this.state.searchTerm}/>
            return temp === null ? <h2>There is no brewery with that name!</h2> : temp;
        }
    }

    findeVenues() {
        if (this.state.searchTerm === "") {
            return <h2>Nothing yet!</h2>
        } else {
            console.log("now this is " + this.state.searchTerm);
            let temp = <VenueSearch nameChunk={this.state.searchTerm}/>
            return temp === null ? <h2>There is no venue with that name!</h2> : temp;
        }
    }

    collector() {
        this.setState({beerFinder: this.findBeers(), breweryFinder: this.findBreveries(), venueFinder: this.findeVenues()});
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    <div className="main">
                        <div><h2 align="center">Search</h2></div>
                        <div className="search">
                            <div className="row justify-content-center form-inline">
                                <div className="form-group mx-sm-3 mb-2">
                                    <label htmlFor="searchField" className="sr-only">Search</label>
                                    <input type="text" className="form-control" id="searchField" value={this.state.searchTerm} onChange={this.setSearchTerm.bind(this)}/>
                                </div>
                                <button type="submit" className="btn btn-dark mb-2" onClick={() => {this.collector()}}>Search</button>
                            </div>
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-beers-tab" data-toggle="tab" href="#nav-beers" role="tab" aria-controls="nav-beers" aria-selected="true">Beers</a>
                                    <a className="nav-item nav-link" id="nav-breweries-tab" data-toggle="tab" href="#nav-breweries" role="tab" aria-controls="nav-breweries" aria-selected="false">Breweries</a>
                                    <a className="nav-item nav-link" id="nav-venues-tab" data-toggle="tab" href="#nav-venues" role="tab" aria-controls="nav-venues" aria-selected="false">Venues</a>
                                </div>
                            </nav>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="nav-beers" role="tabpanel" aria-labelledby="nav-beers-tab">{this.state.beerFinder}</div>
                                <div className="tab-pane fade" id="nav-breweries" role="tabpanel" aria-labelledby="nav-breweries-tab">{this.state.breweryFinder}</div>
                                <div className="tab-pane fade" id="nav-venues" role="tabpanel" aria-labelledby="nav-venues-tab">{this.state.venueFinder}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );

    }


    setSearchTerm(event) {
        this.setState({searchTerm: null});
        this.setState({searchTerm: event.target.value});
    }
}