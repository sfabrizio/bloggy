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

    toggleEditMode() {
        console.log('toggleEditMode', this.props.id);
        this.setState({editMode: !this.state.editMode});
    }

    render() {
        return (
            <div>
                <div><span contentEditable={this.state.editMode}>{this.props.title}</span>
                    <EditButton toggleEditMode={this.toggleEditMode.bind(this)} itemId={this.props.id} />
                    <DeleteButton itemId={this.props.id} />
                </div>
                <div contentEditable={this.state.editMode}>{this.props.content}</div>
            </div>
        );
    }
}
