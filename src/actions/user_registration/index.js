import {requests} from "../../agent";
import {SubmissionError} from "redux-form";
import {apiError} from "../../helpers";
import {USER_CONFIRMATION_SUCCESS, USER_REGISTER_COMPLETE, USER_REGISTER_SUCCESS} from "../const";

export const userRegisterSuccess = () => {
    return {
        type: USER_REGISTER_SUCCESS
    }
};

export const userRegisterComplete = () => {
    return {
        type: USER_REGISTER_COMPLETE
    }
};

export const userConfirmationSuccess = () => {
    return {
        type: USER_CONFIRMATION_SUCCESS
    }
}

export const regUser = (login, password, passwordRepeated, email, name) => {
    return (dispatch) => {
        return requests.post("/users", {login, password, passwordRepeated, email, name}, false)
            .then(() => dispatch(userRegisterSuccess()))
            .catch(error => {
                throw new SubmissionError(apiError(error.response));
            });
    }
};

export const userConfirmation = (confirmationToken) => {
    return (dispatch) => {
        return requests.post("/users/confirm", {confirmationToken}, false)
            .then(() => dispatch(userConfirmationSuccess()))
            .catch(() => {
                throw new SubmissionError({ confirmationToken: "Confirmation token is invalid" });
            });
    }
};
