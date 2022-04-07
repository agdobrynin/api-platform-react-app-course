import React from "react";
import {connect} from "react-redux";

import "./ImageUpload.css";
import {imageUpload} from "../actions/media";

const mapDispatchToProps = {imageUpload};

class ImageUpload extends React.Component{
    onChange(e) {
        const file = e.target.files[0];

        this.props.imageUpload(file);
    }

    render() {
        return(
            <div className="nice-input-upload">
                <input type="file"
                       data-title="Click me or drag and drop file here"
                       onChange={this.onChange.bind(this)}
                />
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(ImageUpload);
