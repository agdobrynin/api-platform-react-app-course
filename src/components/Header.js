import React from "react";
import {Link} from "react-router-dom";
import {Loader} from "./Loader";

export default class Header extends React.Component {
    renderUser() {
        const { userProfile, userLogout } = this.props;

        if (null === userProfile) {
            return (<Loader />);
        }

        return (
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-auto mr-auto">Hello <b>{userProfile.name}</b></div>
                    <div className="col-auto">
                        <button className="btn btn-outline-success" type="button" onClick={userLogout}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { isAuth } = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">React blog</Link>
                <ul className="navbar-nav mr-auto"></ul>
                <span class="navbar-text">
                    {isAuth
                        ? this.renderUser()
                        : <Link to="/login">Sign in</Link>}
                </span>
            </nav>
        );
    }
}
