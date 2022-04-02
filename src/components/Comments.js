import React from "react";
import {Message} from "./Message";
import timeAgo from "timeago.js"
import {TransitionGroup, CSSTransition} from "react-transition-group";

import "./Comments.css";

export default class Comments extends React.Component {
    render() {
        const {comments} = this.props;

        if (comments && comments?.length === 0) {
            return (
                <Message message="No comments yet." messageType="alert-warning"/>
            );
        }

        return (<div className="card mb-3 mt-3 shadow-sm">
            <TransitionGroup>
                {comments.map(comment => {
                    return (
                        <CSSTransition key={comment.id} timeout={1000} classNames="fade">
                            <div className="card-body border-bottom">
                                {comment.content}
                                <div>
                                    <small className="text-muted">{timeAgo().format(comment.createdAt)} by {comment.author.name}</small>
                                </div>
                            </div>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>);
    }
}
