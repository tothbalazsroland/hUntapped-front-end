import React from "react";
import {getUrl} from "./ApiUrl";
import {CheckinBox} from "./CheckinBox";

export class CheckinList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            sectionType: props.sectionType,
            id: props.id,
            checkins: []
        };
    }

    componentDidMount() {
        this.setState( {isLoading: true});
        const url = getUrl()+"api/checkin/" + this.state.sectionType + "id=" + this.state.id;
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState( {checkins: data, isLoading:false}))
    }

    render() {
        if (this.state.checkins.length === 0) {
            return (
              <h1 align="center">No checkins yet!</h1>
            );
        } else {
            return (
                <div>
                    {this.state.checkins.map(checkin => (
                        <CheckinBox checkin={checkin}/>
                    ))}
                </div>
            );
        }
    }
}