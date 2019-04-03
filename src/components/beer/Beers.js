import React from "react";
import {Navbar} from "../Navbar"
import {getUrl} from "../ApiUrl";
import Modal from "react-bootstrap/Modal";
import {Redirect} from "react-router-dom";

export class Beers extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            beers: [],
            isLoading: true,
            showModal: false,
            isLoggedIn: false,
            redirect:false,
            redirectUrl:""
        }
    }


    componentDidMount(){
        if (localStorage.getItem("token")) {
            this.setState({isLoggedIn:true});
        }
        this.setState( {isLoading: true});
        fetch(getUrl()+"api/beers")
            .then(response => response.json())
            .then(data => this.setState( {beers: data, isLoading:false}))
    }

    render() {
        const isLoading = this.state.isLoading;
        const beers = this.state.beers;
        let closeModal = () => this.setState({ showModal: false });
        if (isLoading){
            return <div>
                    <Navbar/>
                    <h1 align="center">Loading....</h1>
                    </div>
        }else if (this.state.redirect){
            return <Redirect to={this.state.redirectUrl}/>
        }
        else
            return<div>
                    <Navbar/>
                <div className="container ">
                    <div className="main">
                        <div><h2 align="center">Beers</h2></div>
                        { beers.map((beer, key) => <div key={beer.id} className="card">
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
                                <span><button className="btn btn-primary" onClick={() => this.checkIn(beer.id)}>Check-in</button></span>
                            </div>
                        </div>)}
                    </div>
                </div>
                <Modal
                    size="sm"
                    show={this.state.showModal}
                    onHide={closeModal}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Log in to rate</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You have to be logged in to rate a beer!</Modal.Body>
                </Modal>
                </div>
    }

    checkIn(id) {
        if (this.state.isLoggedIn) {
            this.setState({redirect:true, redirectUrl:"/checkin/"+id});
        }else {
            this.setState({showModal:true});
        }
    }
}