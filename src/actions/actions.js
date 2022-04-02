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
    USER_LOGIN_SUCCESS,
    USER_PROFILE_ERROR,
    USER_PROFILE_FETCHING,
    USER_PROFILE_RECEIVED,
    USER_LOGIN_FETCHING,
    USER_LOGIN_ERROR,
    USER_SET_ID,
} from "./const";
import {SubmissionError} from "redux-form";
import {apiError} from "../helpers";


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

export const blogPostUnload = () => ({
    type: BLOG_POST_UNLOAD,
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

export const commentsFetching = () => ({
    type: COMMENTS_FETCHING,
});

export const commentsReceived = (data) => ({
    type: COMMENTS_RECEIVED,
    data,
});

export const commentsUnload = () => ({
    type: COMMENTS_UNLOAD,
});

export const commentsError = (error) => ({
    type: COMMENTS_ERROR,
    error,
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
        type: USER_LOGIN_SUCCESS,
        token,
        userId,
    }
};

export const userLoginFetching = () => {
    return {
        type: USER_LOGIN_FETCHING,
    }
};

export const userLoginError = () => {
    return {
        type: USER_LOGIN_ERROR,
    }
};


export const userLoginAssign = (username, password) => {
    return (dispatch) => {
        dispatch(userLoginFetching());

        return requests.post('/login_check', {username, password}, false)
            .then(response => dispatch(userLoginSuccess(response.token, response.id)))
            .catch(error => {
                dispatch(userLoginError());
                const {code, message = error.message} = error.response?.body || {code: 0, message: error.message};
                const _error = `${code}: ${message}`;
                throw new SubmissionError({_error})
            });
    }
};

export const userProfileError = () => {
    return {
        type: USER_PROFILE_ERROR
    }
};

export const userProfileFetching = () => {
    return {
        type: USER_PROFILE_FETCHING
    }
};

export const userProfileReceived = (userId, data) => {
    return {
        type: USER_PROFILE_RECEIVED,
        data,
        userId,
    }
};

export const userSetId = (userId) => {
    return {
        type: USER_SET_ID,
        userId,
    }
};

export const userProfileFetch = (userId) => {
    return (dispatch) => {
        dispatch(userProfileFetching());

        return requests.get(`/users/${userId}`, true)
            .then(response => dispatch(userProfileReceived(userId, response)))
            .catch(error => dispatch(userProfileError()));
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

export const addComment = (content, blogPostId) => {
    return (dispatch) => {
        return requests.post('/comments', {content, post: `/api/blog_posts/${blogPostId}`})
            .then(response => response)
            .catch(error => {
                const _error = apiError(error);
                throw new SubmissionError({content: _error})
            });
    }
};
