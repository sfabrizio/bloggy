import dispatcher from "../dispatcher";
import baseURL from "../config";
import axios from "axios";

export function createBlog(title, content) {
    dispatcher.dispatch({
        type: "CREATE_BLOG",
        title,
        content
    });
}

export function deleteBlog(id) {
    dispatcher.dispatch({
        type: "DELETE_BLOG",
        id,
    });
}

export function reloadBlogs() {

    axios(`${baseURL}/api/getAll`).then( (data) => {
        const parsedData  = sortByKey(data.data.blog, 'id');
        dispatcher.dispatch({type: "RECEIVE_BLOGS", blog: parsedData});
    });

    dispatcher.dispatch({type: "FETCH_BLOGS"});
}

//sort json array.
function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }).reverse();
}
