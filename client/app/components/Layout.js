import React from 'react';

import './Header/Header';
import './Body/Body';
import './Footer/Footer';

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
                <Footer />
            </div>

        );
    }
}
