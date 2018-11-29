import React from "react";

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

        fetch("http://localhost:8080/api/allbeers")
            .then(response => response.json())
            .then(data => this.setState( {beers: data, isLoading:false}))
    }

    render() {
        const isLoading = this.state.isLoading;
        const beers = this.state.beers;
        if (isLoading){
            return <div>Loading....</div>
        }
        else
            return <div>
                { beers.map((beer) => <li>{beer.name}</li>)}
            </div>
    }

}