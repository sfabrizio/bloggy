import React from "react";

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Sam's blog"
        };
    }

    render() {
        return (
            <div class="header">
                <div> { this.state.title } </div>
            </div>
        );
    }
}
