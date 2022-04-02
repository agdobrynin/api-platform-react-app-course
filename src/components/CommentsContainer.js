import React from "react";

import {commentsFetch, commentsSetPage, commentsUnload} from "../actions/actions";
import {connect} from "react-redux";
import {Loader} from "./Loader";
import Comments from "./Comments";
import {Paginator} from "./Paginator";
import {Message} from "./Message";

const mapStateToProps = state => ({
    ...state.comments
});

const mapDispatchToProps = {
    commentsFetch,
    commentsUnload,
    commentsSetPage,
};

class CommentsContainer extends React.Component {
    componentWillUnmount() {
        this.props.commentsUnload();
    }

    componentDidUpdate(prevProps) {
        const {currentPage, postId, commentsFetch} = this.props;

        if (currentPage && prevProps.currentPage !== currentPage) {
            commentsFetch(postId, currentPage);
        }
    }

    componentDidMount() {
        this.changePage(1);
    }

    changePage(page) {
        const {commentsSetPage} = this.props;
        commentsSetPage(page);
    }

    render() {
        const {comments, isFetching, currentPage, pageCount} = this.props;

        if (isFetching) {
            return (<Loader message="Loading comment"/>);
        }

        if (comments?.length === 0) {
            return <Message message="Write first comment"/>
        }

        return (<div>
            <h3>Comments</h3>
            {comments && <Comments comments={comments}/>}
            {(pageCount > 1) && <div className="d-flex justify-content-center">
                <Paginator
                    setPage={this.changePage.bind(this)}
                    currentPage={currentPage}
                    pageCount={pageCount}/>
            </div>}
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
