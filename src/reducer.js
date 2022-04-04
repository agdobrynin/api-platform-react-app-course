import {combineReducers} from "redux";
import blogPostList from "./reducers/blogPostList";
import blogPost from "./reducers/blogPost";
import comments from "./reducers/comments";
import {reducer as formReducer} from "redux-form";
import auth from "./reducers/auth";
import {routerReducer} from "react-router-redux";
import registration from "./reducers/registration";

export default combineReducers({
    blogPostList,
    blogPost,
    comments,
    auth,
    routerReducer,
    form: formReducer,
    registration,
})
