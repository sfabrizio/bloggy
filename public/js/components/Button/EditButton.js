import React from "react";


export default class DeleteButton extends React.Component {
    constructor() {
        super();
        this.state = {
            mode : false
        };
    }

    editItem () {
        console.log('Edit item id:', this.props.itemId);
        this.setState( { mode: !this.state.mode} );
        this.props.toggleEditMode();
    }

    render() {
        return (
            <button class="button edit" onClick={this.editItem.bind(this)}>
                { this.state.mode ? 'Save' : 'Edit' }
            </button>
        );
    }
}
