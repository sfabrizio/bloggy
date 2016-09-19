import React from 'react';
import NewButton from '../Button/NewButton';

export default class BlogEntryCreator extends React.Component {
    constructor() {
        super();
        this.state = {
            renderError: false,
            title: 'New Blog Post Title',
            content: 'New Blog Post Content',
            render: true
        };
    }

    readUserInput() {
        const title = this.refs.newTitle.outerText,
            content = this.refs.newContent.outerText;

        this.setState({adding: !this.state.adding});

        return {title, content};
    }

    createItem () {
        const data = this.readUserInput();

        if ( this.isValidData(data) ) {//little validation
            this.setState({renderError: false});
            this.props.createBlog(data);
            this.resetInputs();
            window.scrollTo(0,0);// scroll to the item created.
        } else {
            this.setState({renderError: true});
        }
    }

    isValidData (data) {
        if ( !data.title  || !data.content ) {
            return false;
        } else if ( data.title === this.props.title && data.content === this.props.content ) {
            return false;
        }
        return true;
    }

    showErrorData () {
        if (this.state.renderError) {
            return <label className="error-label"> Invalid data: Please insert text first. </label>;
        }
    }

    resetInputs () {
        const contentElement = document.getElementById('content-empty'),
            titleElement = document.getElementById('title-empty');

        contentElement.innerHTML = '';
        titleElement.innerHTML = '';
    }

    render() {
        return (
            <div className="blog-item item-creator">
                {this.showErrorData.bind(this)()}
                <div className="blog-item__title">
                    <div className="title"
                         ref="newTitle"
                         id='title-empty'
                         data-placeHolder={this.state.title}
                         contentEditable="true"></div>
                    <div className="title-buttons">
                        <NewButton create={this.createItem.bind(this)} read={this.readUserInput.bind(this)}/>
                    </div>
                </div>
                <div className="blog-item__content"
                     ref="newContent"
                     data-placeHolder={this.state.content}
                     id='content-empty'
                     contentEditable="true"></div>
            </div>
        );
    }
}
