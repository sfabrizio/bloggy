import React from 'react';


export default class Footer extends React.Component {

    render() {
        return (
            <div className="footer">
                <span>Bloggy, made it with &#9829;</span>
                <span>&nbsp;|&nbsp;</span>
                <span>See the code on: <a href="https://github.com/sfabrizio/bloggy.git" target="_blank">Github</a></span>
            </div>
        );
    }
}
