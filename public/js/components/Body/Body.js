import React from "react";
import BlogItemRow from "./BlogItemRow";
import BlogEntryCreator from "./BlogEntryCreator";
import BlogStore from "../../stores/BlogStore";
import * as BlogActions from "../../actions/BlogActions";


export default class Body extends React.Component {
    constructor() {
        super();
        this.state = {
            blogs: BlogStore.getAll()
        };
    }

    componentWillMount() {
        BlogStore.on("change", this.getBlogs.bind(this));
        BlogActions.reloadBlogs(); // first get
        this.autoReloadBlogs(); // auto reload every 5s
    }

    componentWillUnmount() {
        BlogStore.removeListener("change", this.getBlogs);
    }

    getBlogs() {
        this.setState({
            blogs: BlogStore.getAll()
        });
    }

    autoReloadBlogs() {
        setInterval( () => {
            console.log('fetching...');
            BlogActions.reloadBlogs();
        },5000);
    }

    render() {
        const { blogs } = this.state;
        const BlogEntries = blogs.map((entry) => {
            return  <BlogItemRow
                        key={entry.id}
                        id={entry.id}
                        title={entry.title}
                        content={entry.content}
                    />
        });

        return (
            <div className="body">
                <div className="items-container">
                    { BlogEntries }
                    <BlogEntryCreator createBlog={BlogActions.createBlog.bind(this)}/>
                </div>
            </div>
        );
    }
}
