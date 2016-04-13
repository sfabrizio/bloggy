import React from "react";
import BlogItemRow from "./BlogItemRow";

export default class Body extends React.Component {
    constructor() {
        super();
        //mock-up data
        this.data = [

            {
                "id": 1,
                "title": "Title 1",
                "content": "This is the content of the blog post 1."
            },

            {
                "id": 2,
                "title": "Title 2",
                "content": "This is the content of the blog post 2."
            },

            {
                "id": 3,
                "title": "Title 3",
                "content": "This is the content of the blog post 3."
            }
        ];
    }

    parseData () {
        let pairs = [],
            data = this.data;

        for(let i in data){
            pairs.push(
                <BlogItemRow
                    id={this.data[i].id}
                    title={this.data[i].title}
                    content={this.data[i].content}
                />
            );
        }
        return pairs;
    }

    render() {
        return (
            <div class="bodyList">
                { this.parseData() }
            </div>
        );
    }
}
