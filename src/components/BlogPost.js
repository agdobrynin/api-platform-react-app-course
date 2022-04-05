import React from "react";
import timeAgo from "timeago.js"
import {Message} from "./Message";
import {API_HOST} from "../agent";

export default class BlogPost extends React.Component {
    imageGallery () {
        const {post: {mediaObjects = []}} = this.props;

        return (
            <div className="row border-top pt-4">
                    {mediaObjects.map(image => {
                        const url = `${API_HOST}${image.contentUrl}`;

                        return (
                            <div className="col-sm-6 col-md-4 mb-3">
                            <img src={url} className="fluid img-thumbnail ml-1"/>
                            </div>
                            )
                    })}
            </div>
        );
    }

    render() {
        const {post} = this.props;

        if (post === null) {
            return (
                <Message message="Post not found" messageType="alert-danger"/>
            );
        }

        const media = post?.mediaObjects || [];

        return (<div className="card mb-3 mt-3 shadow-sm">
            <div className="card-body">
                <h2>{post.title}</h2>
                <p className="text-muted">{timeAgo().format(post.createdAt)} by {post.author.name}</p>
                <p className="card-text">{post.content}</p>
                {media.length > 0 && this.imageGallery()}
            </div>
        </div>);
    }
}
