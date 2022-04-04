import React from "react";
import {connect} from "react-redux";
import RegFom from "./RegFom";
import RegConfirmForm from "./RegConfirmForm";
import {userRegisterComplete} from "../actions/user_registration";
import {Link} from "react-router-dom";

const mapStateToProps = state => ({
    ...state.registration
});

const mapDispatchToProps = {
    userRegisterComplete
};

class RegContainer extends React.Component {
    componentWillUnmount() {
        const {registrationSuccess, confirmationSuccess} = this.props;

        if (registrationSuccess && confirmationSuccess) {
            this.props.userRegisterComplete();
        }
    }

    render() {
        const {registrationSuccess, confirmationSuccess} = this.props;

        if (!registrationSuccess) {
            return <RegFom/>;
        }

        if (!confirmationSuccess) {
            return <RegConfirmForm/>
        }

        return (
            <div>
                <h2>🎉 Your account activated!</h2>
                <p>You can <Link to="/login">Sign in</Link> to blog service now 🚀</p>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegContainer);
