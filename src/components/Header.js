import React from "react";
import {Link} from "react-router-dom";
import {Loader} from "./Loader";

export default class Header extends React.Component {
    renderUser() {
        const { userProfile } = this.props;

        if (null === userProfile) {
            return (<Loader />);
        }

        return (<span className="navbar-text">Hello <b>{userProfile.name}</b></span>);
    }

    render() {
        const { isAuth } = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">React blog</Link>
                {isAuth
                    ? this.renderUser()
                    : <span className="navbar-text"><Link to="/login">Sign in</Link></span>}
            </nav>
        );
    }
}
