import React from "react";
import {API_HOST} from "../agent";

export default class ImageGallery extends React.Component {
    onImageDelete = image => e => {
        e.preventDefault();
        this.props.deleteHandler(image);
    }

    render() {
        /** @type {ImageDto} images */
        const {images, deleteHandler = null, isImageRequestDelete} = this.props;
        const hasDeleteHandler = typeof deleteHandler === "function";

        return(
            <div className="row border-top pt-4">
                {images.map(imageDto => {
                    return (
                        <div key={imageDto.imageId} className="col-sm-6 col-md-4 mb-3">
                            {hasDeleteHandler
                                && <button
                                    disabled={isImageRequestDelete}
                                    type="button"
                                    onClick={this.onImageDelete(imageDto)}
                                    className="btn btn-sm btn-block btn-danger mb-2">Delete it</button>
                            }
                            <img src={imageDto.absoluteUrl} className="fluid img-thumbnail ml-1"/>
                        </div>
                    )
                })}
                <div className="clearfix"></div>
            </div>
        );
    }
}
