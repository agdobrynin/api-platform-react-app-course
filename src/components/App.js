import React from "react";
import {Route, Switch} from "react-router";
import LoginForm from "./LoginForm";
import BlogPostListContainer from "./BlogPostListContainer";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h2>Hello!</h2>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/" component={BlogPostListContainer}/>
                </Switch>
            </div>
        );
    }
}