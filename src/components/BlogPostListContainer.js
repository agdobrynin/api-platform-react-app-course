import React from "react";
import BlogPostList from "./BlogPostList";
import {blogPostAdd, blogPostList} from "../actions/actions";
import {connect} from "react-redux";


const mapStateToProps = state => ({
    ...state.blogPostList
});

const mapDispatchToProps = {
    blogPostList,
    blogPostAdd,
};

class BlogPostListContainer extends React.Component {
    componentDidMount() {
        this.props.blogPostList();
    }

    render() {
        return (<div>
                <h2>Blog post container</h2>
                <BlogPostList posts={this.props.posts}/>
            </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostListContainer);
