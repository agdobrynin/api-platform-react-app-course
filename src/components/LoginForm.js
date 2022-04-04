import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../form";
import {connect} from "react-redux";
import {Message} from "./Message";
import {userProfileFetch} from "../actions/user_profile";
import {userLoginAssign} from "../actions/user_login";

const mapStateToProps = state => ({
    ...state.auth,
});

const mapDispatchToProps = {
    userLoginAssign, userProfileFetch
}

class LoginForm extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { token, userId, userProfileFetch, history } = this.props;

        if(prevProps.token !== token) {
            userProfileFetch(userId);
            history.push("/");
        }
    }

    onSubmit({username, password}) {
        return this.props.userLoginAssign(username, password);
    }

    render() {
        const {handleSubmit, error, submitting} = this.props;

        return (
            <div className="text-center">
                {error && <Message message={error} messageType="alert-danger"/>}
                <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field label="Username" name="username" type="text"  component={renderField}/>
                    <Field label="Password" name="password" type="password" component={renderField}/>
                    <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                        {submitting ? "Loading data. Please wait" : "Log in"}
                    </button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "LoginForm",
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
