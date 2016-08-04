import React from 'react';


export default class ShowButton extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false
        };
    }

    toggle () {
        this.props.action(!this.state.show);
        this.setState({show: !this.state.show});
    }

    render() {
        return (
            <a className="button button__show" onClick={this.toggle.bind(this)}>
                {this.state.show ? 'Show less' : 'Show more'}
            </a>
        );
    }
}
