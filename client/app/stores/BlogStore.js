import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class BlogStore extends EventEmitter {
    constructor() {
        super();

        //this is a kind of initial load message.
        // it will be overwrite till the first GET :P
        this.blogs = [
            {
                "id": 38,
                "title": "loading",
                "content": ""
            }
        ];
    }

    createBlog(data) {
        const id = Date.now(),
            title = data.data.title,
            content = data.data.content;

        this.blogs.unshift({
            id,
            title,//thanks es6 for all the magic xD
            content
        });

        this.emit("change");
    }

    getAll() {
        return this.blogs;
    }

    handleActions(action) {
        switch(action.type) {
            case "CREATE_BLOG": {
                this.createBlog(action.data);
                break;
            }
            case "RECEIVE_BLOGS": {
                this.blogs = action.blog;
                this.emit("change");
                break;
            }
            case "DELETE_BLOG": {
                this.blogs.splice(this.searchInJson(action.id), 1);
                this.emit("change");
                break;
            }
            case "UPDATE_BLOG": {
                this.blogs[ this.searchInJson(action.data.id) ] = action.data;
                this.emit("change");
                break;
            }
        }
    }

    searchInJson(id) {
        for (let i=0 ; i < this.blogs.length ; i++) {
            if (this.blogs[i]['id'] === id) {
                return i;
            }
        }
    }
}

const blogStore = new BlogStore;
dispatcher.register(blogStore.handleActions.bind(blogStore));
export default blogStore;
