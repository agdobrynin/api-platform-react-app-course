import {
    BLOG_POST_LIST_ERROR,
    BLOG_POST_FETCH,
    BLOG_POST_LIST_RECEIVED,
    BLOG_POST_LIST_SET_PAGE,
    BLOG_POST_LIST_UNLOAD,
} from "../actions/const";
import {hydraMember, hydraPageCount} from "../helpers";

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
            };
        case BLOG_POST_LIST_RECEIVED:
            return {
                ...state,
                posts: hydraMember(action.data),
                pageCount: hydraPageCount(action.data),
                isFetching: false,
            };
        case BLOG_POST_LIST_UNLOAD:
        case BLOG_POST_LIST_ERROR:
            return {
                ...state,
                isFetching: false,
                posts: null,
                currentPage: null,
                pageCount: null,
            };
        default:
            return state;
    }
};
