import React from 'react';


export default class DeleteButton extends React.Component {
    constructor() {
        super();
    }

    deleteItem () {
        this.props.action();
    }

    render() {
        return (
            <a className="button button__delete" onClick={this.deleteItem.bind(this)}>
                Delete
            </a>
        );
    }
}
