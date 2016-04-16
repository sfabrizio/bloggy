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
            errorData: false
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
        const title = this.refs.newTitle.outerText,
            content = this.refs.newContent.outerText,
            id = this.props.id;
        //validation ok?
        if ( this.isValidData(title,content) ){
            this.setState({errorData: false}); //clean error
            BlogActions.updateBlog({id, title, content});
        } else { // no, so show me the general error
            this.setState({errorData: true});
        }
    }

     isValidData (title, content){

         if ( !title  || !content ){
            return false;
         }
         else if ( title === this.props.title && content === this.props.content ){
             return false;
         }
         return true;
    }

    deleteBlogItem() {
        let res = confirm('Are you sure that you want delete this item?');
        if (!res) {return;}
        BlogActions.deleteBlog(this.props.id);
    }

    cancelEdit () {
        this.setState({editMode: false});
    }

    showErrorData () {
        if (this.state.errorData){
            return <label className="error-label"> Invalid data: Please enter some text first. </label>
        }
    }

    render() {
        return (
            <div className="blog-item">
                {this.showErrorData.bind(this)()}
                <div className="blog-item__title">
                    <div id={`title-${this.props.id}`}
                         className="title"
                         ref="newTitle"
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
                <div className="blog-item__content" ref="newContent" contentEditable={this.state.editMode}>{this.props.content}</div>
            </div>
        );
    }
}
