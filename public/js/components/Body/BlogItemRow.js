import React from "react";
import DeleteButton from "../Button/DeleteButton";
import EditButton from "../Button/EditButton";
import * as BlogActions from "../../actions/BlogActions";

export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            editMode: false
        };
    }

    toggleEditMode() {
        this.setState({editMode: !this.state.editMode});
    }

    deleteBlogItem() {
        BlogActions.deleteBlog(this.props.id);
    }

    render() {
        return (
            <div className="blog-item">
                <div className="blog-item__title">
                    <div className="title" contentEditable={this.state.editMode}>{this.props.title}</div>
                    <div className="title-buttons">
                        <EditButton toggleEditMode={this.toggleEditMode.bind(this)} itemId={this.props.id} />
                        <DeleteButton action={this.deleteBlogItem.bind(this)} />
                    </div>
                </div>
                <div className="blog-item__content" contentEditable={this.state.editMode}>{this.props.content}</div>
            </div>
        );
    }
}
