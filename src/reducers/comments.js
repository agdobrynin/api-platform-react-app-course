import {
    COMMENT_NEW_SUCCESS,
    COMMENTS_SET_PAGE,
    COMMENTS_ERROR,
    COMMENTS_FETCHING,
    COMMENTS_RECEIVED,
    COMMENTS_UNLOAD
} from "../actions/const";
import {hydraPageCount} from "../helpers";

export default (state = {
    comments: null,
    isFetching: false,
    currentPage: null,
    pageCount: null,
}, action) => {
    switch (action.type) {
        case COMMENT_NEW_SUCCESS:
            return {
                ...state,
                isFetching: false,
                comments: [action.comment, ...state.comments],
            }
        case COMMENTS_SET_PAGE:
            return {
                ...state,
                currentPage: action.page,
            }
        case COMMENTS_FETCHING:
            return {
                ...state,
                isFetching: true,
            }

        case COMMENTS_RECEIVED:
            return {
                ...state,
                isFetching: false,
                comments: action.data["hydra:member"],
                pageCount: hydraPageCount(action.data),
            }

        case COMMENTS_ERROR:
        case COMMENTS_UNLOAD:
            return {
                ...state,
                isFetching: false,
                comments: null,
            }

        default: {
            return state;
        }
    }
};
