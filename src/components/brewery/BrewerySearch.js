import React from "react"
import {getUrl} from "../ApiUrl";


export class BrewerySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breweries: [],
            searchTerm: this.props.nameChunk,
            isLoading: true,
        };
    };

    sendSearch(nameChunk) {
        const url = getUrl()+"api/brewery/search=" + nameChunk;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({breweries: data, isLoading: false})
            });
    }



    componentDidMount() {
        this.setState( {isLoading: true});
        this.sendSearch(this.props.nameChunk);
    }

    // IMPORTANT!! at this function use the nextProps, thats the new one!
    componentWillReceiveProps(nextProps) {
        // cc ip: 192.168.162.37
        this.setState({breweries: null});
        this.sendSearch(nextProps.nameChunk);
    }





    render() {
        const breweries = this.state.breweries;
        console.log(breweries);
        if (breweries !== null && breweries.length !== 0) {
            return <div className="main">
                    <div><h2 align="center">Breweries</h2></div>
                    { breweries.map((brewery, key) => <div key={brewery.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title"><a href={"/brewery/"+brewery.id}>{brewery.name}</a></h5>
                            <p className="brewery-name"> {brewery.country}</p>
                            <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <td className="rating"> Rating: {brewery.rating} </td>
                                    <td className="numberofratings">{brewery.numberOfRatings} Ratings</td>
                                </tr>
                                </tbody>
                            </table>
                            <p className="description">{brewery.description}</p>
                        </div>
                    </div>)}
                </div>
        } else {
            return <h2>Couldn't find brewery with {this.props.nameChunk}.</h2>;
        }
    }

}