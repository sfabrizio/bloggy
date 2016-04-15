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
        this.setState( { mode: !this.state.mode}, this.checkSave );
        this.props.toggleEditMode();
    }

    checkSave(){
        //check if we need call save
        if (!this.state.mode) {
            this.props.save();
        }
    }

    render() {
        return (
            <a className="button button__edit" onClick={this.editItem.bind(this)}>
                { this.state.mode ? 'Save' : 'Edit' }
            </a>
        );
    }
}
