import React from "react";
import timeAgo from "timeago.js"
import {Loader} from "./Loader";

export default class BlogPost extends React.Component {
    render() {
        const {post, isFetching} = this.props;

        if (isFetching) {
            return (<Loader/>);
        }

        if (post === null) {
            return (
                <div className="alert alert-warning" role="alert">
                    Post not found
                </div>
            );
        }

        return (<div className="card mb-3 mt-3 shadow-sm">
            <div className="card-body">
                <h2>{post.title}</h2>
                <p className="text-muted">{timeAgo().format(post.createdAt)} by {post.author.name}</p>
                <p className="card-text">{post.content}</p>
            </div>
        </div>);
    }
}
