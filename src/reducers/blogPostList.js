import {BLOG_POST_LIST_ERROR, BLOG_POST_FETCH, BLOG_POST_LIST_RECEIVED} from "../actions/const";

export default (state = {
    posts: null,
    isFetching: false,
}, action ) => {
    switch (action.type) {
        case BLOG_POST_FETCH:
            return {
                ...state,
                isFetching: true,
            };
        case BLOG_POST_LIST_RECEIVED:
            return {
                ...state,
                posts: action.data["hydra:member"],
                isFetching: false,
            };
        case BLOG_POST_LIST_ERROR:
            return{
                isFetching: false,
                posts: null,
            };
        default:
            return {
                ...state,
                isFetching: false,
            };
    }
};
