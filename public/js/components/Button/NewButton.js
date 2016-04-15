import React from "react";


export default class DeleteButton extends React.Component {
    constructor() {
        super();
    }

    addItem () {
        const data = this.props.read();
        if (!data){//little validation
            return;
        }
        this.props.action(data);// take this good data!
    }

    render() {
        return (
            <a class="button button__add" onClick={this.addItem.bind(this)}>
                Add
            </a>
        );
    }
}
