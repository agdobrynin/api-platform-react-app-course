import React from "react";
import {API_HOST} from "../agent";

export default class ImageGallery extends React.Component {
    render() {
        const {images} = this.props;

        return(
            <div className="row border-top pt-4">
                {images.map((image, key) => {
                    const url = `${API_HOST}${image.contentUrl}`;

                    return (
                        <div key={key} className="col-sm-6 col-md-4 mb-3 image-item justify-content-center text-center">
                            <img src={url} className="fluid img-thumbnail ml-1"/>
                        </div>
                    )
                })}
            </div>
        );
    }
}
