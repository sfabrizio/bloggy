import React from "react";

import NewButton from "../Button/NewButton";

export default class BlogEntryCreator extends React.Component {
    constructor() {
        super();
        this.state = {
            adding: false,
            title: 'New Blog Title',
            content: 'New blog Description'
        };
    }

    readUserInput() {
        const title = this.refs.newTitle.outerText,
            content = this.refs.newContent.outerText;

        // this will avoid summit the initial text
        if (title === this.state.title && content === this.state.content ){
            return false;
        }
        this.setState({adding: !this.state.adding});
        return {title, content};
    }

    render() {
        return (
            <div className="blog-item">
                <div className="blog-item__title">
                    <div className="title" ref="newTitle" contentEditable="true">{this.state.title}</div>
                    <div className="title-buttons">
                        <NewButton action={this.props.createBlog} read={this.readUserInput.bind(this)}/>
                    </div>
                </div>
                <div className="blog-item__content"
                     ref="newContent" contentEditable="true">{this.state.content}</div>
            </div>
        );
    }
}
