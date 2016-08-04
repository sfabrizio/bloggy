import React from 'react';


export default class Loading extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="blog-item loading">
                <div>
                    <h1>Loading..</h1>
                    <img src="/images/load.gif" alt=""/>
                </div>
            </div>
        );
    }
}
