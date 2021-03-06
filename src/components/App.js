import React from "react";
import {Route, Switch} from "react-router";
import LoginForm from "./LoginForm";
import BlogPostListContainer from "./BlogPostListContainer";
import Header from "./Header";
import BlogPostContainer from "./BlogPostContainer";
import {storage} from "../storage";
import {requests} from "../agent";
import {connect} from "react-redux";
import {userProfileFetch, userSetId} from "../actions/user_profile";
import {userLogout} from "../actions/user_login";
import RegContainer from "./RegContainer";
import BlogPostForm from "./BlogPostForm";

const mapStateToProps = state => ({
    ...state.auth,
});

const mapDispatchToProps = {
    userProfileFetch,
    userSetId,
    userLogout,
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
        const { userId, userSetId, userProfile } = this.props;

        if (userProfile !== null) {
            userSetId(userId);
        }
    }

    componentDidMount() {
        const userId = storage.getUserId();
        const {userProfileFetch, userSetId} = this.props;

        if (userId) {
            userSetId(userId);
            userProfileFetch(userId);
        }
    }

    render() {
        const { isAuth, userProfile, userLogout, history } = this.props;

        return (
            <div>
                <Header isAuth={isAuth} userProfile={userProfile} userLogout={userLogout} history={history}/>
                <Switch>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/blog-post-new" component={BlogPostForm} />
                    <Route path="/blog-post/:id" component={BlogPostContainer}/>
                    <Route path="/reg" component={RegContainer}/>
                    <Route path="/:page?" component={BlogPostListContainer}/>
                </Switch>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
