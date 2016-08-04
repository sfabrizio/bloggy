import React from 'react';


export default class SearchBox extends React.Component {
    constructor() {
        super();
        this.state = {
            text : 'Search'
        };
    }

    doSearch () {
        let query=this.refs.searchInput.value; // this is the search text
        this.props.search(query);
    }

    render() {
        return (
            <div className="searc-box">
                <input type="text" ref="searchInput" placeholder="Search" value={this.props.query } onChange={this.doSearch.bind(this)}/>
            </div>
        );
    }
}
