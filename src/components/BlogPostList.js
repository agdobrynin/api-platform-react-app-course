import React from "react";
import timeAgo from "timeago.js"
import {Link} from "react-router-dom";
import {Message} from "./Message";

export default class BlogPostList extends React.Component {
    render() {
        const {posts} = this.props;

        if (posts === null || posts?.length === 0) {
            return (
                <Message message="Blog is empty" messageType="alert-warning"/>
            );
        }

        return (<div>
            {posts && posts.map(post => (
                <div className="card m-3 p-3 shadow-sm" key={post.id}>
                    <h3>
                        <Link to={`/blog-post/${post.id}`}>{post.title}</Link>
                    </h3>
                    <small className="text-muted pb-3">{timeAgo().format(post.createdAt)} by {post.author.name}</small>
                    <p className="card-text border-bottom pb-3">{post.content}</p>
                    <div className="text-muted font-weight-light">Has <strong>{post.comments.length}</strong> comments</div>
                </div>)
            )}
        </div>);
    }
}
