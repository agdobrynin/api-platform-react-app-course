import {BLOG_POST_ERROR, BLOG_POST_FETCH, BLOG_POST_RECEIVED, BLOG_POST_UNLOAD} from "../actions/const";
import ImageDto from "../Dto/ImageDto";

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
            const images = action.data?.mediaObjects
                .reduce((acc, image) => { acc.push(new ImageDto(image)); return acc }, []) || [];
            action.data.images = images;

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
             return state;
    }
};
