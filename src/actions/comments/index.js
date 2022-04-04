import {requests} from "../../agent";
import {COMMENTS_ERROR, COMMENTS_FETCHING, COMMENTS_RECEIVED, COMMENTS_SET_PAGE, COMMENTS_UNLOAD} from "../const";

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
export const commentsSetPage = (page) => ({
    type: COMMENTS_SET_PAGE,
    page,
});
export const commentsFetch = (postId, page = 1) => {
    return (dispatch) => {
        dispatch(commentsFetching());

        return requests.get(`/blog_posts/${postId}/comments?_page=${page}`)
            .then(response => dispatch(commentsReceived(response)))
            .catch(error => dispatch(commentsError(error)));
    }
};
