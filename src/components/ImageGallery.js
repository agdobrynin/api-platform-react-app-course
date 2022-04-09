import React from "react";
import {API_HOST} from "../agent";

export default class ImageGallery extends React.Component {
    onImageDelete = image => e => {
        e.preventDefault();
        this.props.deleteHandler(image);
    }

    render() {
        const {images, deleteHandler = null, isImageRequestDelete} = this.props;
        const hasDeleteHandler = typeof deleteHandler === "function";

        return(
            <div className="row border-top pt-4">
                {images.map((image, index) => {
                    const url = `${API_HOST}${image.contentUrl}`;
                    const key = image["@id"] || image.id || index;

                    return (
                        <div key={key} className="col-sm-6 col-md-4 mb-3 image-item justify-content-center text-center">
                            {hasDeleteHandler
                                && <button
                                    disabled={isImageRequestDelete}
                                    type="button"
                                    onClick={this.onImageDelete(image)}
                                    className="btn btn-sm btn-block btn-danger mb-2">Delete it</button>
                            }
                            <img src={url} className="fluid img-thumbnail ml-1"/>
                        </div>
                    )
                })}
            </div>
        );
    }
}
