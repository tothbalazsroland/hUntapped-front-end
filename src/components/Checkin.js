import React from "react";
import {getUrl} from "./ApiUrl";
import {Navbar} from "./Navbar";

export class Checkin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            beer:{name:""},
            beerId: this.props.match.params.id,
            rating: 2.5,
            description:""
        };
        this.onSliderChanged = this.onSliderChanged.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.rateBeer = this.rateBeer.bind(this);
    }

    componentDidMount(){
        this.setState( {isLoading: true});
        const url = getUrl()+"api/beer/id="+this.state.beerId;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState( {beer: data, isLoading:false}))
    }

    onSliderChanged(event){
        console.log(event.target.value);
        this.setState({rating:event.target.value})
    }

    handleChange(event){
        this.setState({description:event.target.value})
    }

    rateBeer(event){
        console.log("CLICKED THE BUTTON");
    }

    render() {
        const rating = this.state.rating;
        const beer = this.state.beer;
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
                        <input type="text" value={this.state.description} onChange={this.handleChange} />
                        <br/>
                        <a className="btn btn-primary" onClick={this.rateBeer}>Rate</a>
                    </div>
                </div>
            </div>
        );
    }
}