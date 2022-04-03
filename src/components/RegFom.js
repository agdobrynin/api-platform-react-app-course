import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderField} from "../form";
import {regUser} from "../actions/actions";

const mapDispatchToProps = {
    regUser,
};

class RegForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {termsAccepted: false};
    }

    onSubmit(values) {
        return this.props.regUser(...Object.values(values))
            .then(() => {
                this.props.reset();
            });
    }

    onTermsAcceptedClick() {
        this.setState(prevState => ({termsAccepted: !prevState.termsAccepted}));
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <form className="mt-4" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Login:" type="text" name="login" component={renderField}/>
                <Field label="Password:" type="password" name="password" component={renderField}/>
                <Field label="Repeat password:" type="password" name="passwordRepeated" component={renderField}/>
                <Field label="Email:" type="email" name="email" component={renderField}/>
                <Field label="Full name:" type="text" name="name" component={renderField}/>
                <div className="form-check form-group">
                    <label className="check-form-label">
                        <input className="form-check-input" type="checkbox"
                               onClick={this.onTermsAcceptedClick.bind(this)}
                               value={false}/>
                        I agree to the terms and conditions</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block" disabled={!this.state.termsAccepted}>
                    Register
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: "RegForm",
})(connect(null, mapDispatchToProps)(RegForm));
