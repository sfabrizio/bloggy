import React from "react";


export default class DeleteButton extends React.Component {
    constructor() {
        super();
    }

    addItem () {
        console.log('add item');
    }

    render() {
        return (
            <a class="button button__add" onClick={this.addItem.bind(this)}>
                Add
            </a>
        );
    }
}
