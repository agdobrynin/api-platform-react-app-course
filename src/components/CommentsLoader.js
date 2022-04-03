import React from "react";

export class CommentsLoader extends React.Component {
    render() {
        const {onClick, isFetching} = this.props;

        return (
            <button className="btn btn-block btn-dark" disabled={isFetching} onClick={onClick}>
                {isFetching ? (<i className="fas fa-spinner fa-spin"></i>) : "Loading more"}
            </button>
        )
    }
}
