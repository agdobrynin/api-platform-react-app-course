import {USER_LOGIN_SUCCESS, USER_LOGOUT} from "./actions/const";
import {requests} from "./agent";
import {storage} from "./storage";

export const tokenMiddleware = store => next => action => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            storage.setToken(action.token);
            storage.setUserId(action.userId);
            requests.setToken(action.token);
            break;
        case USER_LOGOUT:
            storage.clearAuth();
            requests.setToken(null);
            break;
        default:
    }

    next(action);
};
