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
            <button class="button delete" onClick={this.addItem.bind(this)}>
                Add
            </button>
        );
    }
}
