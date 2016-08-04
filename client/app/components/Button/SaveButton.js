import React from 'react';


export default class SaveButton extends React.Component {
    constructor() {
        super();
    }

    SaveItem () {
        this.props.action();
    }

    render() {
        return (
            <a className="button button__edit" onClick={this.SaveItem.bind(this)}>
                Save
            </a>
        );
    }
}
