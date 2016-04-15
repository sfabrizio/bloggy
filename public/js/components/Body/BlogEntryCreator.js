import React from "react";

import NewButton from "../Button/NewButton";

export default class BlogEntryCreator extends React.Component {
    constructor() {
        super();
        this.state = {
            editMode: false
        };
    }

    toggleAddMode() {
        console.log('toggleEditMode', this.props.id);
        this.setState({editMode: !this.state.editMode});
    }

    render() {
        return (
            <div className="blog-item">
                <div className="blog-item__title">
                    <div className="title" contentEditable="true">New Blog Title</div>
                    <div className="title-buttons"><NewButton /></div>
                </div>
                <div className="blog-item__content" contentEditable="true">New blog Description</div>
            </div>
        );
    }
}
