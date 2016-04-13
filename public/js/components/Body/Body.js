import React from "react";
import DeleteButton from "../Button/DeleteButton";
import EditButton from "../Button/EditButton";

export default class Body extends React.Component {
    constructor() {
        super();
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
                <div>
                    <div>{this.data[i].title}
                        <EditButton itemId={this.data[i].id} />
                        <DeleteButton itemId={this.data[i].id} />
                    </div>
                    <div>{this.data[i].content}</div>
                </div>
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
