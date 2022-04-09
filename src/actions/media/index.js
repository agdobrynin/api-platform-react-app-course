import {requests} from "../../agent";

export const IMAGE_UPLOADING = "IMAGE_UPLOADING";
export const IMAGE_UPLOADED = "IMAGE_UPLOADED";
export const IMAGE_UPLOAD_ERROR = "IMAGE_UPLOAD_ERROR";
export const IMAGE_DELETE_REQUEST = "IMAGE_DELETE_REQUEST";
export const IMAGE_DELETE_SUCCESS = "IMAGE_DELETE_SUCCESS";
export const IMAGE_DELETE_ERROR = "IMAGE_DELETE_ERROR";

export const imageUploading = () => {
    return {
        type: IMAGE_UPLOADING,
    }
};

export const imageUploadError = (data) => {
    return {
        type: IMAGE_UPLOAD_ERROR,
        data
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
        return requests.upload("/media_objects", file)
            .then(response => dispatch(imageUploaded(response)))
            .catch(error => dispatch(imageUploadError(error)))
    }
};

export const imageDeleteRequest = () => {
    return {
        type: IMAGE_DELETE_REQUEST
    }
}

export const imageDeleteSuccess = (ImageDto) => {
    return {
        type: IMAGE_DELETE_SUCCESS,
        ImageDto
    }
}

export const imageDeleteError = (data) => {
    return {
        type: IMAGE_DELETE_ERROR,
        data,
    }
}

/**
 *
 * @param {ImageDto} dto
 */
export const imageDelete = (dto) => {
    return (dispatch) => {
        dispatch(imageDeleteRequest());
        return requests.delete(`${dto.resourceId}`, true, true)
            .then(() => dispatch(imageDeleteSuccess(dto)))
            .catch(error => dispatch(imageDeleteError(error)))
    }
}
