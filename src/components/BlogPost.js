import React from "react";
import timeAgo from "timeago.js"
import {Message} from "./Message";

export default class BlogPost extends React.Component {
    render() {
        const {post} = this.props;

        if (post === null) {
            return (
                <Message message="Post not found" messageType="alert-danger"/>
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
