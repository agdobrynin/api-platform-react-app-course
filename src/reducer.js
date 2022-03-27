import {combineReducers} from "redux";
import blogPostList from "./reducers/blogPostList";
import blogPost from "./reducers/blogPost";
import comments from "./reducers/comments";
import {reducer as formReducer} from "redux-form";
import auth from "./reducers/auth";

export default combineReducers({
    blogPostList,
    blogPost,
    comments,
    auth,
    form: formReducer,
})
