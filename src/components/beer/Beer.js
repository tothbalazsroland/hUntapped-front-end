import React from "react";
import {Navbar} from "../Navbar";
import {getUrl} from "../ApiUrl";
import {CheckinList} from "../CheckinList"

export class Beer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            beer: {},
            isLoading: true,
            beerId:this.props.match.params.id
        }
    }

    componentDidMount(){
        this.setState( {isLoading: true});
        const url = getUrl()+"api/beer/id="+this.state.beerId;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState( {beer: data, isLoading:false}))
    }

    render() {
        const isLoading = this.state.isLoading;
        const beer = this.state.beer;
        if (isLoading){
            return <h1 align="center">Loading...</h1>
        }
        else
        return (<div>
                <Navbar/>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"><a href={"/beer/"+beer.id}>{beer.name}</a></h5>
                        <p className="brewery-name"> {beer.brewery.name}</p>
                        <p className="beer-style"> {beer.type}</p>
                        <p className="card-text">{beer.description}</p>
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <td className="ABV"> {beer.abv} % ABV</td>
                                <td className="IBU">{beer.ibu} IBU</td>
                                <td className="rating"> Rating: {beer.rating} </td>
                                <td className="numberofratings">{beer.numberOfRatings} Ratings</td>
                            </tr>
                            </tbody>
                        </table>
                        <span><a href={"/checkin/"+ beer.id} className="btn btn-primary">Check-in</a></span>
                    </div>
                    <CheckinList sectionType="beer" id={beer.id}/>
                </div></div>

        );
    }

}
