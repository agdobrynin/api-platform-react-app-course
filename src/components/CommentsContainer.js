import React from "react";

import {commentsFetch, commentsSetPage, commentsUnload} from "../actions/actions";
import {connect} from "react-redux";
import {Loader} from "./Loader";
import Comments from "./Comments";
import {Message} from "./Message";
import {CommentsLoader} from "./CommentsLoader";

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
        this.changePage();
    }

    changePage() {
        const {commentsSetPage, currentPage} = this.props;
        const page = currentPage ? currentPage + 1 : 1;

        commentsSetPage(page);
    }

    render() {
        const {comments, isFetching, isAllLoading} = this.props;

        if (isFetching && comments === null) {
            return (<Loader message="Loading comment"/>);
        }

        if (comments?.length === 0) {
            return <Message message="Write first comment"/>
        }

        return (<div>
            <h3>Comments</h3>
            {comments && <Comments comments={comments}/>}
            {!isAllLoading && <div className="d-flex justify-content-center mt-4 mb-4">
                <CommentsLoader onClick={this.changePage.bind(this)} isFetching={isFetching}/>
            </div>}
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
