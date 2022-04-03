import React from "react";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {fieldTextarea, renderField} from "../form";
import {addComment} from "../actions/actions";

const mapStateToProps = state => ({
    ...state.comment,
});

const mapDispatchToProps = {
    addComment
};

class CommentForm extends React.Component {
    onSubmit({content}) {
        const { postId, addComment, reset } = this.props;

        return addComment(content, postId).then(() => reset());
    }

    render() {
        const {handleSubmit, submitting} = this.props;

        return (
            <fieldset className="card shadow-sm mb-4" disabled={submitting}>
                <form className="card-body" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        disabled={submitting}
                        name="content"
                        label="Write your comment:"
                        type={fieldTextarea} component={renderField}/>
                    <button type="submit" className="btn btn-primary">
                        {submitting ? "Data sending. Wait..." : "Add comment"}
                    </button>
                </form>
            </fieldset>
        );
    }
}

export default reduxForm({
    form: "CommentForm",
})(connect(mapStateToProps, mapDispatchToProps)(CommentForm));
