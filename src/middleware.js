import {USER_LOGIN_SUCCESS, USER_LOGOUT, USER_PROFILE_ERROR} from "./actions/const";
import {requests} from "./agent";
import {storage} from "./storage";
import {userLogout} from "./actions/actions";

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
        case USER_PROFILE_ERROR:
            const { auth: {userId, userProfile} } = store.getState();

            if (userId === action.userId && userProfile === null) {
                store.dispatch(userLogout())
            }

            break;
        default:
    }

    next(action);
};
