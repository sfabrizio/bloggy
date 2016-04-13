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
            <div>
                <div><span contentEditable="true">New Blog Title</span>
                    <NewButton />
                </div>
                <div contentEditable="true">New blog Description</div>
            </div>
        );
    }
}
