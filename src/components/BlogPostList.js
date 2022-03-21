import React from "react";

export default class BlogPostList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {posts} = this.props;

        return (<div>
            <ul>
            {posts && posts.map(post => (<li key={post.id}>{post.title}</li>))}
            </ul>
        </div>);
    }
}
