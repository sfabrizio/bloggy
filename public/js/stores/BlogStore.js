import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class BlogStore extends EventEmitter {
    constructor() {
        super();

        //this is a kind of initial load message.
        // it will be overwrite in the first GET.
        this.blogs = [
            {
                "id": 11,
                "title": "Loading..",
                "content": ""
            }
        ];
    }

    createTodo(title, content) {
        const id = Date.now();

        this.todos.push({
            id,
            title,
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
                this.createBlog(action.title, action.content);
                break;
            }
            case "RECEIVE_BLOGS": {
                this.blogs = action.blog.data.blog;
                this.emit("change");
                break;
            }
        }
    }

}

const blogStore = new BlogStore;
dispatcher.register(blogStore.handleActions.bind(blogStore));

export default blogStore;
