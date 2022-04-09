import {
    IMAGE_DELETE_ERROR,
    IMAGE_DELETE_REQUEST,
    IMAGE_DELETE_SUCCESS,
    IMAGE_UPLOAD_ERROR,
    IMAGE_UPLOADED,
    IMAGE_UPLOADING
} from "../actions/media";
import {BLOG_POST_UNLOAD} from "../actions/const";
import ImageDto from "../Dto/ImageDto";

export default (state = {
    /** @type {ImageDto[]|null} */
    images: null,
    isImageRequestInProgress: false,
    isImageRequestDelete: false,
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
            const imageDto = new ImageDto(action.data);

            return {
                ...state,
                isImageRequestInProgress: false,
                images: state.images === null ? [imageDto] : state.images.concat(imageDto),
                imageRequestError: null,
            };
        case IMAGE_UPLOAD_ERROR:
        case IMAGE_DELETE_ERROR:
            return {
                ...state,
                isImageRequestInProgress: false,
                imageRequestError: action.data,
                isImageRequestDelete: false,
            };
        case IMAGE_DELETE_REQUEST:
            return {
                ...state,
                imageRequestError: null,
                isImageRequestDelete: true,
            };
        case IMAGE_DELETE_SUCCESS:
            return {
                ...state,
                images: state.images.filter(ImageDto => ImageDto.resourceId !== action.ImageDto.resourceId),
                imageRequestError: null,
                isImageRequestDelete: false,
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
