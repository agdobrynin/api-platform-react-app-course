import {COMMENT_NEW_SUCCESS} from "../const";
import {requests} from "../../agent";
import {SubmissionError} from "redux-form";
import {apiError} from "../../helpers";
import {userLogout} from "../user_login";

export const commentNewSuccess = (comment) => {
    return {
        type: COMMENT_NEW_SUCCESS,
        comment,
    }
}
export const addComment = (content, blogPostId) => {
    return (dispatch) => {
        return requests.post('/comments', {content, post: `/api/blog_posts/${blogPostId}`})
            .then(response => dispatch(commentNewSuccess(response)))
            .catch(error => {
                if (error.response?.statusCode === 401) {
                    return dispatch(userLogout());
                }

                throw new SubmissionError(apiError(error.response))
            });
    }
};
