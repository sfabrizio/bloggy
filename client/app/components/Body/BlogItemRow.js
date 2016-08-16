import React from 'react';
import * as BlogActions from '../../actions/BlogActions';
import '../Button/DeleteButton';
import '../Button/EditButton';
import '../Button/SaveButton';
import '../Button/CancelButton';
import '../Button/ShowButton';

export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            editMode: false,
            errorData: false,
            showMoreButton: true
        };
    }

    toggleEditMode() {
        this.setState({editMode: !this.state.editMode}, this.focusTitle);
        this.showMore(true);//automatically show the full text
        this.setState({showMoreButton: false});//hide the button show more
    }

    cancelEdit () {
        this.setState({editMode: false, errorData: false });
        this.showMore(false);//hide the full text
        this.setState({showMoreButton: true});//show the button show more
    }

    focusTitle() {
        if (this.state.editMode) {
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

    saveEvent () {
        const title = this.refs.newTitle.outerText,
            content = this.refs.newContent.outerText,
            id = this.props.id;

        //validation
        if ( this.isValidData(title,content) ) {
            this.showMore(false);//show less on
            this.setState({editMode: false, errorData: false, showMoreButton: true}); //clean error & show more on
            BlogActions.updateBlog({id, title, content});
        } else { // no, so show me the general error
            this.setState({errorData: true});
        }
    }

    isValidData (title, content) {
        if ( !title  || !content ) {
            return false;
        } else if ( title === this.props.title && content === this.props.content ) {
            return false;
        }
        return true;
    }

    deleteBlogItem() {
        //temp confirm dialog.. please don't prevent multiples alerts on the browser..
        // if you did it, well you can re open the tab and will work again.
        const res = confirm('Are you sure that you want delete this item?');

        if (!res) {return;}
        BlogActions.deleteBlog(this.props.id);
    }

    showErrorData () {
        if (this.state.errorData) {
            return <label className="error-label"> Invalid data: Please enter some text first. </label>;
        }
    }

    showMore (flag) {
        //with flag = true show the full text
        const content = this.refs.newContent;

        if (flag) {
            content.style.height = '100%';
        } else {
            content.style.height = '100px';
        }
    }

    calculateReadingTime () {
        // Hmm It's seem to be that The Average Reading Speed Is 150-180 Words Per Minute..
        // so let's gonna use that number for now..
        const wordsCount = this.props.content.split(' ').length,
            result = parseInt(wordsCount / 150);

        if (result < 1) {
            return '1 min.';
        }
        /*eslint-disable*/
        return result + ' mins.'; //`${result}, mins.'
        /*eslint-enable*/
    }

    render() {
        return (
            <div className="blog-item">
                <div className="top-label">
                    <label className="info-label"> Created on  {new Date((this.props.id)).toDateString()} </label>
                    {this.showErrorData.bind(this)()}
                </div>
                <div className="blog-item__title">
                    <div className="title"
                         ref="newTitle"
                         id={`title-${this.props.id}`}
                         contentEditable={this.state.editMode}>{this.props.title}</div>
                    <div className="title-buttons">
                        {( () => {//initial state buttons
                            if (!this.state.editMode) {
                                return [<EditButton action={this.toggleEditMode.bind(this)} />,
                                        <DeleteButton action={this.deleteBlogItem.bind(this)} />];
                            }
                        })()}

                        {(() => {//on edit mode:
                            if (this.state.editMode) {
                                return [<SaveButton action={this.saveEvent.bind(this)} />,
                                        <CancelButton action={this.cancelEdit.bind(this)} />];
                            }
                        })()}

                    </div>
                </div>
                <div className="blog-item__content">
                    <div className="content" ref="newContent" contentEditable={this.state.editMode}>{this.props.content}</div>
                        {(() => {//hide estimate time on edition mode
                            if (this.state.showMoreButton) {
                                return <label class="info-label"> Estimated Reading Time: {this.calculateReadingTime.bind(this)()}</label>;
                            }
                        }
                        )()}
                    <div className="content-buttons" ref="showMoreContent">
                        {( () => {
                            if (this.props.content.length > 550 && this.state.showMoreButton) {
                                return <ShowButton action={this.showMore.bind(this)}/>;
                            }
                        }) ()}

                    </div>
                </div>
            </div>
        );
    }
}
