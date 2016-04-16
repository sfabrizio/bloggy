import React from "react";

import Header from "./Header/Header";
import Body from "./Body/Body";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    changeTitle(title) {
        this.setState({title});
    }

    render () {
        return (
            <div>
                <Header />
                <Body />
            </div>
        );
    }
}
