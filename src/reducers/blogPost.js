import {BLOG_POST_ERROR, BLOG_POST_FETCH, BLOG_POST_RECEIVED, BLOG_POST_UNLOAD} from "../actions/const";

export default (state = {
    post: null,
    isFetching: false,
}, action ) => {
    switch (action.type) {
        case BLOG_POST_FETCH:
            return {
                ...state,
                isFetching: true,
            };
        case BLOG_POST_RECEIVED:
            return {
                ...state,
                post: action.data,
                isFetching: false,
            };
        case BLOG_POST_ERROR:
            return{
                ...state,
                isFetching: false,
                post: null,
            };
        case BLOG_POST_UNLOAD:
            return {
                ...state,
                isFetching: true,
                post: null,
            };
        default:
            return {
                ...state,
                isFetching: false,
            };
    }
};
