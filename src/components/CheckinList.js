import React from "react";
import {getUrl} from "./ApiUrl";
import {CheckinBox} from "./CheckinBox";
import InfiniteScroll from "react-infinite-scroll-component";


export class CheckinList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            sectionType: props.sectionType,
            id: props.id,
            checkins: [],
            offset: 0,
            limit: 10,
            hasMore: true
        };
        this.fetchMoreCheckin = this.fetchMoreCheckin.bind(this);
        this.dataHandler = this.dataHandler.bind(this);
    }

    componentDidMount() {
        this.setState( {isLoading: true});
        const url = getUrl()+"api/checkin/" + this.state.sectionType + "id=" + this.state.id + "/limit=" + this.state.limit + "/offset=" + this.state.offset;
        fetch(url)
            .then(response => response.json())
            .then(data => {this.dataHandler(data)});
    }

    fetchMoreCheckin() {
        const url = getUrl()+"api/checkin/" + this.state.sectionType + "id=" + this.state.id + "/limit=" + this.state.limit + "/offset=" + this.state.offset;
        fetch(url)
            .then(response => response.json())
            .then(data => {this.dataHandler(data)});
    }


    dataHandler(data) {
        if (data.length === 0) {
            this.setState({hasMore: false})
        } else {
            this.setState( {checkins: this.state.checkins.concat(data), limit: this.state.limit + 10, offset: this.state.offset + 10});
        }
    }

    render() {
        const checkins = this.state.checkins;
        if (this.state.checkins.length === 0) {
            return (
              <h1 align="center">No checkins yet!</h1>
            );
        } else {
            return <div>
                <InfiniteScroll
                    dataLength={this.state.checkins.length}
                    next={this.fetchMoreCheckin}
                    hasMore={this.state.hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{textAlign: "center"}}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {this.state.checkins.map((checkin, index) =>
                        <CheckinBox checkin={checkin} key={index}/>
                    )}
                </InfiniteScroll>
            </div>;
        }
    }
}