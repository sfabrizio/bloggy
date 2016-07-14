import React from "react";
import SearchBox from "./SearchBox";
import Body from "./Body";
import BlogStore from "../../stores/BlogStore";

export default class InstantSearch extends React.Component {
    constructor() {
        super();
        this.state ={
            query:'',
            filteredData: BlogStore.getAll()
        };
    }

    doSearch (queryText){
        console.log(queryText);

        //get query result
        var queryResult=[];
        this.props.data.forEach(function(blog){
            if(blog.title.toLowerCase().indexOf(queryText)!=-1)
                queryResult.push(blog);
        });
        this.setState({
            query:queryText,
            filteredData: queryResult
        });

        // BlogStore.blogs = queryResult;
        // BlogStore.emit("change");
    }

    getInitialState () {
        return{
            query:'',
            filteredData: this.props.data
        };
    }

    render () {
        return (

            <div className="body">
                <SearchBox query={this.state.query} search={this.doSearch.bind(this)} />
                <Body data={this.state.filteredData}/>
            </div>
        );
    }
}
