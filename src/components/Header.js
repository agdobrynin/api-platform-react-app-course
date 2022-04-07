import React from "react";
import {Link} from "react-router-dom";
import {Loader} from "./Loader";
import {canWritePost} from "../helpers";

export default class Header extends React.Component {
    logout() {
        const { userLogout, history } = this.props;
        userLogout();
        history.push("/");
    }

    renderUser() {
        const { userProfile } = this.props;

        if (null === userProfile) {
            return (<Loader />);
        }

        return (
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-auto mr-auto">Hello <b>{userProfile.name}</b></div>
                    <div className="col-auto">
                        <button className="btn btn-outline-success" type="button" onClick={this.logout.bind(this)}>Logout</button>
                    </div>
                </div>
            </div>
        );
    }

    regOrSignIn() {
        return (<div className="container"><div className="row align-items-center">
            <div className="col-auto mr-auto"><Link to="/login">Sign in</Link></div>
            <div className="col-auto"><Link to="/reg">Register</Link></div>
        </div></div>);
    }

    render() {
        const { isAuth, userProfile } = this.props;
        const canWrite = canWritePost(userProfile);

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">React blog</Link>
                <ul className="navbar-nav mr-auto">
                    {canWrite && <li className="nav-item nav-link"><Link to="/blog-post-new">Add new post</Link></li>}
                </ul>
                <span className="navbar-text">
                    {isAuth ? this.renderUser() : this.regOrSignIn()}
                </span>
            </nav>
        );
    }
}
