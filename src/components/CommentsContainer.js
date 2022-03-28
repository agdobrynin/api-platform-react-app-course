import React from "react";

import {commentsFetch, commentsUnload} from "../actions/actions";
import {connect} from "react-redux";
import {Loader} from "./Loader";
import Comments from "./Comments";

const mapStateToProps = state => ({
    ...state.comments
});

const mapDispatchToProps = {
    commentsFetch,
    commentsUnload,
};

class CommentsContainer extends React.Component {
    componentDidMount() {
        const {postId, page = 1} = this.props;
        this.props.commentsFetch(postId, page);
    }

    componentWillUnmount() {
        this.props.commentsUnload();
    }

    render() {
        const {comments, isFetching} = this.props;

        if (isFetching) {
            return (<Loader message="Loading comment"/>);
        }

        return (<div>
            {comments && <Comments comments={comments}/>}
        </div>);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
