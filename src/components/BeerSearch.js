import React from "react"




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
        const url = "http://192.168.162.37:8080/api/beer/search=" + nameChunk;
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
                        <p className="brewery-name"> {beer.brewery}</p>
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
            return <h2>Couldn't find beer with {this.props.nameChunk}.</h2>;
        }
    }

}