import React from "react";


export default class DeleteButton extends React.Component {
    constructor() {
        super();
        this.state = {
            edit : false
        };
    }

    editItem () {
        console.log('Edit item id:', this.props.itemId);
    }

    render() {
        return (
            <button class="button edit" onClick={this.editItem.bind(this)}>
                Edit
            </button>
        );
    }
}
