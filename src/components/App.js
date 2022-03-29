import React from "react";
import {Route, Switch} from "react-router";
import LoginForm from "./LoginForm";
import BlogPostListContainer from "./BlogPostListContainer";
import Header from "./Header";
import BlogPostContainer from "./BlogPostContainer";
import {storage} from "../storage";
import {requests} from "../agent";
import {connect} from "react-redux";
import {userProfileFetch} from "../actions/actions";

const mapStateToProps = state => ({
    ...state.auth,
});

const mapDispatchToProps = {
    userProfileFetch
}

class App extends React.Component {
    constructor(props) {
        super(props);
        const token = storage.getToken();

        if (token) {
            requests.setToken(token);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { userId, userProfileFetch } = this.props;

        if (prevProps.userId !== userId && userId !== null) {
            userProfileFetch(userId);
        }
    }

    componentDidMount() {
        const userId = storage.getUserId();
        const {userProfileFetch} = this.props;

        if (userId) {
            userProfileFetch(userId);
        }
    }

    render() {
        const { isAuth, userProfile } = this.props;
        return (
            <div>
                <Header isAuth={isAuth} userProfile={userProfile}/>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/blog-post/:id" component={BlogPostContainer}/>
                    <Route path="/" component={BlogPostListContainer}/>
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
