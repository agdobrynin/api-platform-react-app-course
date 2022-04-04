import {
    BLOG_POST_FETCH,
    BLOG_POST_LIST_ERROR,
    BLOG_POST_LIST_RECEIVED,
    BLOG_POST_LIST_SET_PAGE,
    BLOG_POST_RECEIVED,
    BLOG_POST_UNLOAD
} from "../const";
import {requests} from "../../agent";

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
