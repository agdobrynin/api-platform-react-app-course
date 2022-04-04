import React from "react";
import {connect} from "react-redux";
import RegFom from "./RegFom";
import RegConfirmForm from "./RegConfirmForm";
import {userRegisterComplete} from "../actions/user_registration";

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
                <p>You can <a href="/login"><strong>Sign in</strong></a> to blog service now 🚀</p>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegContainer);
