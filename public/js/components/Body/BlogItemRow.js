import React from "react";
import DeleteButton from "../Button/DeleteButton";
import EditButton from "../Button/EditButton";
import CancelButton from "../Button/CancelButton";
import * as BlogActions from "../../actions/BlogActions";

export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            editMode: false,
            saveEvent: false
        };
    }

    toggleEditMode() {
        this.setState({editMode: !this.state.editMode}, this.focusTitle);
    }

    focusTitle() {
        if (this.state.editMode){
            const el = document.getElementById(`title-${this.props.id}`),
                range = document.createRange(),
                sel = window.getSelection(),
                text = el.childNodes[0];
            range.setStart(el.childNodes[0], text.length);//point to the end
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            el.focus();
        }
    }

    saveEvent (){
        console.log('--savee');
    }

    deleteBlogItem() {
        let res = confirm('Are you sure that you want delete this item?');
        if (!res) {return;}
        BlogActions.deleteBlog(this.props.id);
    }

    cancelEdit () {
        this.setState({editMode: false});
    }



    render() {
        return (
            <div className="blog-item">
                <div className="blog-item__title">
                    <div id={`title-${this.props.id}`}
                         className="title"
                         contentEditable={this.state.editMode}>{this.props.title}</div>
                    <div className="title-buttons">
                        <EditButton save={this.saveEvent.bind(this)} toggleEditMode={this.toggleEditMode.bind(this)} />
                        {(() => {
                            if (this.state.editMode) {
                                return <CancelButton action={this.cancelEdit.bind(this)} />
                            }else{
                                return <DeleteButton action={this.deleteBlogItem.bind(this)} />
                            }
                        })()}
                    </div>
                </div>
                <div className="blog-item__content" contentEditable={this.state.editMode}>{this.props.content}</div>
            </div>
        );
    }
}
