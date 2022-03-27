import {combineReducers} from "redux";
import blogPostList from "./reducers/blogPostList";
import blogPost from "./reducers/blogPost";
import comments from "./reducers/comments";

export default combineReducers({
    blogPostList,
    blogPost,
    comments,
})
