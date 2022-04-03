import {
    COMMENT_NEW_SUCCESS,
    COMMENTS_SET_PAGE,
    COMMENTS_ERROR,
    COMMENTS_FETCHING,
    COMMENTS_RECEIVED,
    COMMENTS_UNLOAD
} from "../actions/const";
import {hydraMember, hydraTotalItems} from "../helpers";

export default (state = {
    comments: null,
    isFetching: false,
    currentPage: null,
    isAllLoading: false,
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
            const comments = state.comments
                ? [...state.comments, ...hydraMember(action.data)]
                : hydraMember(action.data);

            return {
                ...state,
                isFetching: false,
                comments,
                isAllLoading: hydraTotalItems(action.data) <= comments.length,
            }

        case COMMENTS_ERROR:
        case COMMENTS_UNLOAD:
            return {
                ...state,
                isFetching: false,
                comments: null,
                currentPage: null,
                pageCount: null,
                isAllLoading: false,
            }

        default:
            return state;
    }
};
