import {
    BLOG_POST_LIST_ERROR,
    BLOG_POST_FETCH,
    BLOG_POST_LIST_RECEIVED,
    BLOG_POST_LIST_SET_PAGE,
} from "../actions/const";
import {hydraPageCount} from "../helpers";

export default (state = {
    posts: null,
    isFetching: null,
    currentPage: null,
    pageCount: null,
}, action ) => {
    switch (action.type) {
        case BLOG_POST_FETCH:
            return {
                ...state,
                isFetching: true,
            };
        case BLOG_POST_LIST_SET_PAGE:
            return {
                ...state,
                currentPage: action.page,
                isFetching: false,
            };
        case BLOG_POST_LIST_RECEIVED:
            return {
                ...state,
                posts: action.data["hydra:member"],
                pageCount: hydraPageCount(action.data),
                isFetching: false,
            };
        case BLOG_POST_LIST_ERROR:
            return{
                isFetching: false,
                posts: null,
            };
        default:
            return state;
    }
};
