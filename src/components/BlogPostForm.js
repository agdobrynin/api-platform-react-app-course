import React from "react";
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {canWritePost} from "../helpers";
import {Message} from "./Message";

const mapStateToProps = state => ({
    userProfile: state.auth.userProfile,
});

const mapDispatchToProps = {};

class BlogPostForm extends React.Component {

    render() {
        const {userProfile} = this.props;

        if(!canWritePost(userProfile)) {
            return <Message title="Permission deny" message="You can't write post."/>
        }

        return (
            <div>Blog post form</div>
        )
    }
}

export default reduxForm({
    form: "BlogPostForm"
})(connect(mapStateToProps, mapDispatchToProps)(BlogPostForm))
