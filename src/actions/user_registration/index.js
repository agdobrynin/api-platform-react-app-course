import {requests} from "../../agent";
import {SubmissionError} from "redux-form";
import {apiError} from "../../helpers";

export const regUser = (login, password, passwordRepeated, email, name) => {
    return (dispatch) => {
        return requests.post("/users", {login, password, passwordRepeated, email, name}, false)
            .catch(error => {
                throw new SubmissionError(apiError(error.response));
            });
    }
};
