import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../form";
import {userLoginAssign} from "../actions/actions";
import {connect} from "react-redux";

const mapDispatchToProps = {
    userLoginAssign,
}

class LoginForm extends React.Component {
    onSubmit({username, password}) {
        return this.props.userLoginAssign(username, password);
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="text-center">
                <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field label="Username" name="username" type="text"  component={renderField}/>
                    <Field label="Password" name="password" type="password" component={renderField}/>
                    <button type="submit" className="btn btn-primary btn-block">Log in</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: "LoginForm",
})(connect(null, mapDispatchToProps)(LoginForm));
