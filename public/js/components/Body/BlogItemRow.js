import React from "react";
import DeleteButton from "../Button/DeleteButton";
import EditButton from "../Button/EditButton";

export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            editMode: false
        };
    }

    parseData () {
        let pairs = [],
            data = this.data;

        for(let i in data){
            pairs.push(

            );
        }
        return pairs;
    }

    render() {
        return (
            <div>
                <div>{this.props.title}
                    <EditButton itemId={this.props.id} />
                    <DeleteButton itemId={this.props.id} />
                </div>
                <div>{this.props.content}</div>
            </div>
        );
    }
}
