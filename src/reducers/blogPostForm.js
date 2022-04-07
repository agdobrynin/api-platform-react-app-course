import {IMAGE_UPLOAD_ERROR, IMAGE_UPLOADED, IMAGE_UPLOADING} from "../actions/media";
import {BLOG_POST_UNLOAD} from "../actions/const";

export default (state = {
    images: null,
    isImageUploading: false,
}, action) => {
    switch (action.type) {
        case IMAGE_UPLOADING:
            return {
                ...state,
                isImageUploading: true,
            };
        case IMAGE_UPLOADED:
            return {
                ...state,
                isImageUploading: false,
                images: state.images === null ? [action.data] : state.images.concat(action.data),
            };
        case IMAGE_UPLOAD_ERROR:
            return {
                ...state,
                isImageUploading: false,
            };
        case BLOG_POST_UNLOAD:
            return {
                isImageUploading: false,
                images: null,
            };
        default:
            return state;
    }
};
