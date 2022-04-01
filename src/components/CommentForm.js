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
    constructor(props) {
        super(props);
        this.isLoading = false;
    }

    onSubmit({content}) {
        const { postId, addComment, reset } = this.props;
        this.isLoading = true;

        return addComment(content, postId).then(() => reset()).finally(() => this.isLoading = false);
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <fieldset className="card shadow-sm" disabled={this.isLoading}>
                <form className="card-body" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        disabled={this.isLoading}
                        name="content"
                        label="Write your comment:"
                        type={fieldTextarea} component={renderField}/>
                    <button type="submit" className="btn btn-primary">
                        {this.isLoading ? "Data sending. Wait..." : "Add comment"}
                    </button>
                </form>
            </fieldset>
        );
    }
}

export default reduxForm({
    form: "CommentForm",
})(connect(mapStateToProps, mapDispatchToProps)(CommentForm));
