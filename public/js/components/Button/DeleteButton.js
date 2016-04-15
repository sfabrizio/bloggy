import React from "react";


export default class DeleteButton extends React.Component {
    constructor() {
        super();
        this.state = {
            text : "Delete"
        };
    }

    deleteItem () {
        console.log('delete item id:', this.props.itemId);
    }

    render() {
        return (
            <a className="button button__delete" onClick={this.deleteItem.bind(this)}>
                Delete
            </a>
        );
    }
}
