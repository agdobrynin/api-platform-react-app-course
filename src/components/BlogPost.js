import React from "react";

export default class BlogPost extends React.Component {
    render() {
        const {post, isFetching} = this.props;

        if (isFetching) {
            return (
                <div><i className="fas fa-spinner fa-spin"></i> Loading data</div>
            );
        }

        if (post === null) {
            return (
                <div className="alert alert-warning" role="alert">
                    Post not found
                </div>
            );
        }

        return (<div>
            {post.title}
        </div>);
    }
}
