import React from "react";
import {reduxForm} from "redux-form";

class LoginForm extends React.Component {
    render() {
        return (
            <div>Hello from Login form components!</div>
        );
    }
}

export default reduxForm({
    form: "LoginForm",
})(LoginForm);
