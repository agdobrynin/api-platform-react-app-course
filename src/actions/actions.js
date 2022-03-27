import {requests} from "../agent";
import {
    BLOG_POST_LIST_ERROR,
    BLOG_POST_FETCH,
    BLOG_POST_LIST_RECEIVED,
    BLOG_POST_RECEIVED,
    BLOG_POST_UNLOAD,
    COMMENTS_RECEIVED,
    COMMENTS_UNLOAD,
    COMMENTS_ERROR,
    COMMENTS_FETCHING,
    USER_LOGIN_SUCCESS
} from "./const";


export const blogPostFetching = () => ({
    type: BLOG_POST_FETCH,
});

export const blogPostListReceived = (data) => ({
    type: BLOG_POST_LIST_RECEIVED, data,
});

export const blogPostReceived = (data) => ({
    type: BLOG_POST_RECEIVED, data,
});

export const blogPostUnload = () => ({
    type: BLOG_POST_UNLOAD,
});

export const blogPostError = (error) => ({
    type: BLOG_POST_LIST_ERROR, error,
});

export const blogPostListFetch = () => {
    return (dispatch) => {
        dispatch(blogPostFetching());

        return requests.get("/blog_posts")
            .then(response => dispatch(blogPostListReceived(response)))
            .catch(error => dispatch(blogPostError(error)));
    }
};

export const commentsFetching = () => ({
    type: COMMENTS_FETCHING,
});

export const commentsReceived = (data) => ({
    type: COMMENTS_RECEIVED, data,
});

export const commentsUnload = () => ({
    type: COMMENTS_UNLOAD,
});

export const commentsError = (error) => ({
    type: COMMENTS_ERROR, error,
});

export const commentsFetch = (postId, page = 1) => {
    return (dispatch) => {
        dispatch(commentsFetching());

        return requests.get(`/blog_posts/${postId}/comments?_page=${page}`)
            .then(response => dispatch(commentsReceived(response)))
            .catch(error => dispatch(commentsError(error)));
    }
};

export const userLoginSuccess = (token, userId) => {
    return {
        type: USER_LOGIN_SUCCESS, token, userId,
    }
};

export const userLoginAssign = (username, password) => {
    return (dispatch) => {
        return requests.post('/login_check', {username, password}, false)
            .then(response => dispatch(userLoginSuccess(response.token, response.id)))
            .catch(error => error);
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
