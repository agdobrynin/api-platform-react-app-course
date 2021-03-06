import React from "react";
import {connect} from "react-redux";
import BlogPost from "./BlogPost";
import {Loader} from "./Loader";
import CommentsContainer from "./CommentsContainer";
import CommentForm from "./CommentForm";
import {blogPostFetch, blogPostUnload} from "../actions/blog_post";

const mapStateToProps = state => ({
    ...state.blogPost,
    isAuth: state.auth.isAuth,
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
        const {post, isFetching, match: { params: {id} }, isAuth} = this.props;

        if (isFetching) {
            return (<Loader/>);
        }

        return (
            <div>
                <BlogPost post={post}/>
                {post && <CommentsContainer postId={id}/>}
                {isAuth && <CommentForm postId={id}/>}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostContainer);
