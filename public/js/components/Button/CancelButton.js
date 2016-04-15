import React from "react";


export default class DeleteButton extends React.Component {
    constructor() {
        super();
        this.state = {
            text : "Cancel"
        };
    }

    deleteItem () {
        this.props.action();
    }

    render() {
        return (
            <a className="button button__cancel" onClick={this.deleteItem.bind(this)}>
                Cancel
            </a>
        );
    }
}
