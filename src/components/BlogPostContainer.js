import React from "react";
import {blogPostFetch, blogPostUnload} from "../actions/actions";
import {connect} from "react-redux";
import BlogPost from "./BlogPost";

const mapStateToProps = state => ({
    ...state.blogPost
});

const mapDispatchToProps = {
    blogPostFetch,
    blogPostUnload,
};

class BlogPostContainer extends React.Component {
    componentDidMount() {
        const id = this.props?.match?.params?.id || null;
        this.props.blogPostFetch(id);
    }

    componentWillUnmount() {
        this.props.blogPostUnload();
    }

    render() {
        const {post, isFetching} = this.props;

        return (
            <BlogPost post={post} isFetching={isFetching}/>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostContainer);
