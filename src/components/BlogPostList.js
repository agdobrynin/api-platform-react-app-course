import React from "react";
import timeAgo from "timeago.js"
import {Link} from "react-router-dom";

export default class BlogPostList extends React.Component {
    render() {
        const {posts, isFetching} = this.props;

        if (isFetching) {
            return (
                <div><i className="fas fa-spinner fa-spin"></i> Loading data</div>
            );
        }

        if (posts === null || posts?.length === 0) {
            return (
                <div>Blog is empty</div>
            );
        }

        return (<div>
            {posts && posts.map(post => (
                <div className="card m-3 p-3 shadow-sm" key={post.id}>
                    <h3>
                        <Link to={`/blog-post/${post.id}`}>{post.title}</Link>
                    </h3>
                    <small className="text-muted">{timeAgo().format(post.createdAt)}</small>
                    <p className="card-text border-bottom">{post.content}</p>
                </div>)
            )}
        </div>);
    }
}
