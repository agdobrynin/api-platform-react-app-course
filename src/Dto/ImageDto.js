import {API_HOST} from "../agent";

export default class ImageDto {
    _id;
    _relativeUrl;

    constructor(imageResponseApi) {
        this._id = imageResponseApi["@id"];
        this._relativeUrl = imageResponseApi["contentUrl"];
    }

    get resourceId() {
        return this._id;
    }

    get imageId() {
        return this._id.split("/").slice(-1).pop();
    }

    get absoluteUrl() {
        return `${API_HOST}${this._relativeUrl}`;
    }
}
