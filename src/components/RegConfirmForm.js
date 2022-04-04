import React from "react";
import {userConfirmation} from "../actions/user_registration";
import {renderField} from "../form";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Loader} from "./Loader";

const mapDispatchToProps = {userConfirmation};

class RegConfirmForm extends React.Component {
    onSubmit({confirmationToken}) {
        return this.props.userConfirmation(confirmationToken).then(() => this.props.reset());
    }

    render() {
        const {handleSubmit, submitting} = this.props;
        return(
            <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <p>We sending to your email confirmation token. Please input token from email</p>
                <Field name="confirmationToken" label="Confirmation token:" type="text" component={renderField}/>
                {submitting && <Loader/>}
                {!submitting && <button type="submit" className="btn btn-primary btn-block">Confirm your account!</button>}

            </form>
        )
    }
}

export default reduxForm({
    form: "RegConfirmForm"
})(connect(null, mapDispatchToProps)(RegConfirmForm));
