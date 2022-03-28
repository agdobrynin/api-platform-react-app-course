import {USER_LOGIN_SUCCESS} from "./actions/const";
import {requests} from "./agent";
import {storage} from "./storage";

export const tokenMiddleware = store => next => action => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            storage.setToken(action.token);
            storage.setUserId(action.userId);
            requests.setToken(action.token);
            break;
        default:
    }

    next(action);
};
