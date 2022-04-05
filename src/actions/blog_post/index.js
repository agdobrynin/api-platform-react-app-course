import {
    BLOG_POST_FETCH,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECEIVED,
    BLOG_POST_LIST_SET_PAGE,
    BLOG_POST_LIST_UNLOAD,
    BLOG_POST_RECEIVED,
    BLOG_POST_UNLOAD
} from "../const";
import {requests} from "../../agent";
import {SubmissionError} from "redux-form";
import {apiError, apiViolation} from "../../helpers";
import {userLogout} from "../user_login";

export const blogPostFetching = () => ({
    type: BLOG_POST_FETCH,
});
export const blogPostListReceived = (data) => ({
    type: BLOG_POST_LIST_RECEIVED,
    data,
});
export const blogPostListSetPage = (page) => ({
    type: BLOG_POST_LIST_SET_PAGE,
    page,
});
export const blogPostReceived = (data) => ({
    type: BLOG_POST_RECEIVED,
    data,
});
export const blogPostUnload = () => ({
    type: BLOG_POST_UNLOAD,
});
export const blogPostError = (error) => ({
    type: BLOG_POST_LIST_ERROR,
    error,
});
export const blogPostListUnload = () => ({
    type: BLOG_POST_LIST_UNLOAD,
});
export const blogPostListFetch = (page = 1) => {
    return (dispatch) => {
        dispatch(blogPostFetching());

        return requests.get(`/blog_posts?_page=${page}`)
            .then(response => dispatch(blogPostListReceived(response)))
            .catch(error => dispatch(blogPostError(error)));
    }
};
export const blogPostFetch = (id) => {
    return (dispatch) => {
        dispatch(blogPostFetching());

        return requests.get(`/blog_posts/${id}`)
            .then(response => dispatch(blogPostReceived(response)))
            .catch(error => dispatch(blogPostError(error)));
    }
};
export const blogPostAdd = (title, slug, content) => {
    return (dispatch) => {
        return requests.post("/blog_posts", {title, slug, content})
            .catch(error => {
                const statusCode = error.response?.statusCode || 500;
                const messageDefault = error.message;

                if (statusCode === 401) {
                    return dispatch(userLogout());
                } else if (statusCode === 403) {
                    throw new SubmissionError({ _error: "You don't have right to publishing post"});
                } else if (statusCode === 422) {
                    throw new SubmissionError(apiViolation(error.response));
                }

                throw new SubmissionError({ _error: apiError(error.response) || messageDefault});
            })
    };
};
