import React from "react";
import BlogPostList from "./BlogPostList";
import {connect} from "react-redux";
import {Loader} from "./Loader";
import {Paginator} from "./Paginator";
import {blogPostListFetch, blogPostListSetPage, blogPostListUnload} from "../actions/blog_post";


const mapStateToProps = state => ({...state.blogPostList});

const mapDispatchToProps = {blogPostListFetch, blogPostListSetPage, blogPostListUnload};

class BlogPostListContainer extends React.Component {
    getPageFromQueryParam() {
        return Number(this.props.match.params.page || 1);
    }

    componentDidMount() {
        this.changePage(this.getPageFromQueryParam())
    }

    componentDidUpdate(prevProps) {
        const {currentPage, blogPostListFetch, blogPostListSetPage} = this.props;

        if (prevProps.match.params.page !== this.getPageFromQueryParam()) {
            blogPostListSetPage(this.getPageFromQueryParam());
        }

        if (prevProps.currentPage !== currentPage) {
            blogPostListFetch(currentPage);
        }
    }

    componentWillUnmount() {
        this.props.blogPostListUnload();
    }


    changePage(page) {
        const {history, blogPostListSetPage} = this.props;
        blogPostListSetPage(page);
        history.push(`/${page}`);
    }

    render() {
        const {posts, isFetching, pageCount, currentPage} = this.props;

        if (isFetching) {
            return (<Loader/>);
        }

        return (<div>
            <BlogPostList posts={posts}/>
            <div className="d-flex justify-content-center">
                <Paginator setPage={this.changePage.bind(this)} currentPage={currentPage} pageCount={pageCount}/>
            </div>
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostListContainer);
