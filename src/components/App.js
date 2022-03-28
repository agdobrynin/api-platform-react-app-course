import React from "react";
import {Route, Switch} from "react-router";
import LoginForm from "./LoginForm";
import BlogPostListContainer from "./BlogPostListContainer";
import Header from "./Header";
import BlogPostContainer from "./BlogPostContainer";
import {storage} from "../storage";
import {requests} from "../agent";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        const token = storage.getToken();

        if (token) {
            requests.setToken(token);
        }
    }
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/blog-post/:id" component={BlogPostContainer}/>
                    <Route path="/" component={BlogPostListContainer}/>
                </Switch>
            </div>
        );
    }
}
