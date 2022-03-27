import {USER_LOGIN_SUCCESS} from "./actions/const";
import {requests} from "./agent";

export const tokenMiddleware = store => next => action => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            console.log(action);
            window.localStorage.setItem('jwtToken', action.token);
            window.localStorage.setItem('userId', action.userId);
            requests.setToken(action.token);
            break;
        default:
    }

    next(action);
};
