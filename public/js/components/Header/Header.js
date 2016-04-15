import React from "react";

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Bloggy"
        };
    }

    render() {
        return (
            <div class="header">
                <div> <h1>{ this.state.title }</h1> </div>
            </div>
        );
    }
}
