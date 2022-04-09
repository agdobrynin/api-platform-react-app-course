import {
    IMAGE_DELETE_ERROR,
    IMAGE_DELETE_REQUEST,
    IMAGE_DELETE_SUCCESS,
    IMAGE_UPLOAD_ERROR,
    IMAGE_UPLOADED,
    IMAGE_UPLOADING
} from "../actions/media";
import {BLOG_POST_UNLOAD} from "../actions/const";

export default (state = {
    images: null,
    isImageRequestInProgress: false,
    imageRequestError: null,
}, action) => {
    switch (action.type) {
        case IMAGE_UPLOADING:
            return {
                ...state,
                isImageRequestInProgress: true,
                imageRequestError: null,
            };
        case IMAGE_UPLOADED:
            return {
                ...state,
                isImageRequestInProgress: false,
                images: state.images === null ? [action.data] : state.images.concat(action.data),
                imageRequestError: null,
            };
        case IMAGE_UPLOAD_ERROR:
        case IMAGE_DELETE_ERROR:
            return {
                ...state,
                isImageRequestInProgress: false,
                imageRequestError: action.data,
            };
        case IMAGE_DELETE_REQUEST:
            return {
                ...state,
                isImageRequestInProgress: true,
                imageRequestError: null,
            };
        case IMAGE_DELETE_SUCCESS:
            return {
                ...state,
                images: state.images.filter(image => image["@id"] !== action.image["@id"]),
                isImageRequestInProgress: false,
                imageRequestError: null,
            };
        case BLOG_POST_UNLOAD:
            return {
                isImageRequestInProgress: false,
                images: null,
                imageRequestError: null,
            };
        default:
            return state;
    }
};
