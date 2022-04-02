import {
    COMMENT_NEW_SUCCESS,
    COMMENTS_ERROR,
    COMMENTS_FETCHING,
    COMMENTS_RECEIVED,
    COMMENTS_UNLOAD
} from "../actions/const";

export default (state = {
    comments: null,
    isFetching: false,
}, action) => {
    switch (action.type) {
        case COMMENT_NEW_SUCCESS:
            return {
                ...state,
                isFetching: false,
                comments: [action.comment, ...state.comments],
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
