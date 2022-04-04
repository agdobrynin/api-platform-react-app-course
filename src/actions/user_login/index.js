import {USER_LOGIN_ERROR, USER_LOGIN_FETCHING, USER_LOGIN_SUCCESS, USER_LOGOUT} from "../const";
import {requests} from "../../agent";
import {SubmissionError} from "redux-form";

export const userLoginSuccess = (token, userId) => {
    return {
        type: USER_LOGIN_SUCCESS,
        token,
        userId,
    }
};
export const userLogout = () => {
    return {
        type: USER_LOGOUT,
    }
}
export const userLoginFetching = () => {
    return {
        type: USER_LOGIN_FETCHING,
    }
};
export const userLoginError = () => {
    return {
        type: USER_LOGIN_ERROR,
    }
};
export const userLoginAssign = (username, password) => {
    return (dispatch) => {
        dispatch(userLoginFetching());

        return requests.post("/login_check", {username, password}, false)
            .then(response => dispatch(userLoginSuccess(response.token, response.id)))
            .catch(error => {
                dispatch(userLoginError());
                const {code, message = error.message} = error.response?.body || {code: 0, message: error.message};
                const _error = `${code}: ${message}`;
                throw new SubmissionError({_error})
            });
    }
};
