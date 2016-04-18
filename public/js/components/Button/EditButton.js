import React from "react";


export default class EditButton extends React.Component {
    constructor() {
        super();
    }

    EditItem () {
        this.props.action();
    }

    render() {
        return (
            <a className="button button__edit" onClick={this.EditItem.bind(this)}>
                Edit
            </a>
        );
    }
}
