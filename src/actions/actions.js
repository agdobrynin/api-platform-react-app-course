import {requests} from "../agent";
import {BLOG_POST_LIST_ERROR, BLOG_POST_FETCH, BLOG_POST_LIST_RECEIVED, BLOG_POST_RECEIVED} from "./const";

export const blogPostFetching = () => ({
    type: BLOG_POST_FETCH,
});

export const blogPostListReceived = (data) => ({
    type: BLOG_POST_LIST_RECEIVED,
    data,
});

export const blogPostReceived = (data) => ({
    type: BLOG_POST_RECEIVED,
    data,
});

export const blogPostError = (error) => ({
    type: BLOG_POST_LIST_ERROR,
    error,
});

export const blogPostListFetch = () => {
    return (dispatch) => {
        dispatch(blogPostFetching());

        return requests.get("/blog_posts")
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
