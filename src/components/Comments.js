import React from "react";
import {Message} from "./Message";
import timeAgo from "timeago.js"

export default class Comments extends React.Component {
    render() {
        const {comments} = this.props;

        if (comments && comments?.length === 0) {
            return (
                <Message message="No comments yet." messageType="alert-warning"/>
            );
        }

        return (<div className="card mb-3 mt-3 shadow-sm">
            {comments.map(comment => {
                return (
                    <div className="card-body border-bottom" key={comment.id}>
                        {comment.content}
                        <div>
                            <small className="text-muted">{timeAgo().format(comment.createdAt)} by {comment.author.name}</small>
                        </div>
                    </div>
                );
            })}
        </div>);
    }
}
