import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {canWritePost} from "../helpers";
import {Message} from "./Message";
import {fieldTextarea, renderField} from "../form";
import {blogPostAdd, blogPostUnload} from "../actions/blog_post";
import ImageUpload from "./ImageUpload";
import ImageGallery from "./ImageGallery";
import {Loader} from "./Loader";
import {imageDelete} from "../actions/media";

const mapStateToProps = state => ({
    userProfile: state.auth.userProfile,
    ...state.blogPostForm,
});

const mapDispatchToProps = {blogPostAdd, blogPostUnload, imageDelete};

class BlogPostForm extends React.Component {

    onSubmit({title, slug, content}) {
        const {blogPostAdd, reset, history, images} = this.props;

        return blogPostAdd(title, slug, content, images).then(() => {
            reset();
            history.push("/");
        });
    }

    componentWillUnmount() {
        this.props.blogPostUnload();
    }

    render() {
        const {userProfile} = this.props;

        if (!canWritePost(userProfile)) {
            return <Message title="Permission deny" message="You can't write post."/>
        }

        const {
            handleSubmit,
            submitting,
            error,
            images,
            isImageRequestInProgress,
            imageDelete,
            imageRequestError,
            isImageRequestDelete
        } = this.props;

        return (
            <fieldset className="card shadow-sm pt-4 pb-4 mt-4 mb-4" disabled={submitting}>
                {error &&
                    <div className="ml-4 mr-4"><Message message={error} title="An error!" messageType="alert-danger"/>
                    </div>}
                <form className="card-body" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="title" label="Title of post:" component={renderField}/>
                    <Field name="slug" label="Input slug of post:" component={renderField}/>
                    <Field name="content" type={fieldTextarea} label="Content:" component={renderField}/>
                    {imageRequestError && <Message message={imageRequestError.message} messageType="alert-danger"/>}
                    {!isImageRequestInProgress && (<div className="form-group"><ImageUpload/></div>)}
                    {isImageRequestInProgress && <Loader message="Uploading image"/>}
                    {images &&
                        <ImageGallery
                            images={images}
                            deleteHandler={imageDelete}
                            isImageRequestDelete={isImageRequestDelete}/>
                    }
                    <button type="submit"
                            disabled={isImageRequestInProgress || isImageRequestDelete}
                            className="btn btn-primary btn-block">
                        Save
                    </button>
                </form>
            </fieldset>
        )
    }
}

export default reduxForm({
    form: "BlogPostForm"
})(connect(mapStateToProps, mapDispatchToProps)(BlogPostForm))
