import {requests} from "../../agent";

export const IMAGE_UPLOADING = "IMAGE_UPLOADING";
export const IMAGE_UPLOADED = "IMAGE_UPLOADED";
export const IMAGE_UPLOAD_ERROR = "IMAGE_UPLOAD_ERROR";

export const imageUploading = () => {
    return {
        type: IMAGE_UPLOADING,
    }
};

export const imageUploadError = () => {
    return {
        type: IMAGE_UPLOAD_ERROR,
    }
};

export const imageUploaded = (data) => {
    return {
        type: IMAGE_UPLOADED,
        data,
    }
};

export const imageUpload = (file) => {
    return (dispatch) => {
        dispatch(imageUploading());
        return requests.upload('/media_objects', file)
            .then(response => dispatch(imageUploaded(response)))
            .catch(() => dispatch(imageUploadError))
    }
};
