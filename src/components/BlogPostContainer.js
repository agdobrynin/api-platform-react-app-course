import React from "react";
import {blogPostFetch, blogPostUnload} from "../actions/actions";
import {connect} from "react-redux";
import BlogPost from "./BlogPost";
import {Loader} from "./Loader";
import CommentsContainer from "./CommentsContainer";

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
        const {post, isFetching, match: { params: {id} }} = this.props;

        if (isFetching) {
            return (<Loader/>);
        }

        return (
            <div>
                <BlogPost post={post}/>
                {post && <CommentsContainer postId={id}/>}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostContainer);
