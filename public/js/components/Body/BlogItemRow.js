import React from "react";
import DeleteButton from "../Button/DeleteButton";
import EditButton from "../Button/EditButton";
import CancelButton from "../Button/CancelButton";
import ShowButton from "../Button/ShowButton";
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
        //temp confirm dialog.. please don't prevent multiples alerts on the browser..
        // if you did it, well you can re open the tab and will work again.
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

    showMore (flag) {
        let content = this.refs.newContent;
        if (!flag) {
            content.style.height = '100%';
        } else {
            content.style.height = '100px';
        }
    }

    calculateReadingTime () {
        // Hmm It's seem to be that The Average Reading Speed Is 150-180 Words Per Minute..
        // so let's gonna use that number for now..
        const wordsCount = this.props.content.split(' ').length;
        let result = parseInt(wordsCount / 150);

        if (result < 1){
            return 1 + ' min.';
        }
        return result + ' mins.';
    }

    render() {
        return (
            <div className="blog-item">
                <div className="top-label">
                    <label class="info-label"> Created on  {Date(this.props.id)} </label>
                    {this.showErrorData.bind(this)()}
                </div>
                <div className="blog-item__title">
                    <div className="title"
                         ref="newTitle"
                         id={`title-${this.props.id}`}
                         contentEditable={this.state.editMode}>{this.props.title}</div>
                    <div className="title-buttons">
                        <EditButton save={this.saveEvent.bind(this)} toggleEditMode={this.toggleEditMode.bind(this)} />
                        {( () => {
                            if (this.state.editMode) {
                                return <CancelButton action={this.cancelEdit.bind(this)} />
                            }else{
                                return <DeleteButton action={this.deleteBlogItem.bind(this)} />
                            }
                        }) ()}
                    </div>
                </div>
                <div className="blog-item__content">
                    <div className="content" ref="newContent" contentEditable={this.state.editMode}>{this.props.content}</div>
                    <label class="info-label"> Estimated Reading Time: {this.calculateReadingTime.bind(this)()}</label>
                    <div className="content-buttons" ref="showMoreContent">
                        {( () => {
                                if (this.props.content.length > 550){
                                    return <ShowButton action={this.showMore.bind(this)}/>
                                }
                        }) ()}

                    </div>
                </div>
            </div>
        );
    }
}
