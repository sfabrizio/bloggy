import React from "react";


export default class DeleteButton extends React.Component {
    constructor() {
        super();
    }

    addItem () {
        this.props.create();// whatever.. this component don't know!
    }

    render() {
        return (
            <a class="button button__add" onClick={this.addItem.bind(this)}>
                Add
            </a>
        );
    }
}
