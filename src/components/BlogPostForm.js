import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {canWritePost} from "../helpers";
import {Message} from "./Message";
import {fieldTextarea, renderField} from "../form";
import {blogPostAdd} from "../actions/blog_post";

const mapStateToProps = state => ({
    userProfile: state.auth.userProfile,
});

const mapDispatchToProps = {blogPostAdd};

class BlogPostForm extends React.Component {

    onSubmit({title, slug, content}) {
        const {blogPostAdd, reset, history} = this.props;
        return blogPostAdd(title, slug, content).then(() => {
            reset();
            history.push("/");
        });
    }
    render() {
        const {userProfile} = this.props;

        if(!canWritePost(userProfile)) {
            return <Message title="Permission deny" message="You can't write post."/>
        }

        const {handleSubmit, submitting, error} = this.props;

        return(
            <fieldset className="card shadow-sm pt-4 pb-4 mt-4 mb-4" disabled={submitting}>
                {error && <div className="ml-4 mr-4"><Message message={error} title="An error!" messageType="alert-danger"/></div>}
                <form className="card-body" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field name="title" label="Title of post:" component={renderField}/>
                    <Field name="slug" label="Input slug of post:" component={renderField}/>
                    <Field name="content" type={fieldTextarea} label="Content:" component={renderField}/>
                    <button type="submit" className="btn btn-primary btn-block">Save</button>
                </form>
            </fieldset>
        )
    }
}

export default reduxForm({
    form: "BlogPostForm"
})(connect(mapStateToProps, mapDispatchToProps)(BlogPostForm))
