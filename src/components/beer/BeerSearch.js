import React from "react"
import {getUrl} from "../ApiUrl";


export class BeerSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beers: [],
            searchTerm: this.props.nameChunk,
            isLoading: true,
        };
    };

    sendSearch(nameChunk) {
        // cc ip: 192.168.162.37
        const url = getUrl()+"api/beer/search=" + nameChunk;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({beers: data, isLoading: false})
            });
    }



    componentDidMount() {
        console.log("beer search term " + this.state.searchTerm);
        this.setState( {isLoading: true});
        this.sendSearch(this.props.nameChunk);
    }

    // IMPORTANT!! at this function use the nextProps, thats the new one!
    // Because, look! The props just changed! Let's re-render on more time
    // with the old one, for fun sake!
    componentWillReceiveProps(nextProps) {
        this.setState({beers: null});
        this.sendSearch(nextProps.nameChunk);
    }





    render() {
        const beers = this.state.beers;
        console.log(beers);
        if (beers !== null && beers.length !== 0) {
            return <div className="main">
                {beers.map((beer, key) => <div key={beer.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title"><a href={"/beer/" + beer.id}>{beer.name}</a></h5>
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
                    </div>
                </div>)}
            </div>
        } else {
            return <h2>No results!</h2>;
        }
    }

}