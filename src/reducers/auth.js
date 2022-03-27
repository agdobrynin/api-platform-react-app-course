import {USER_LOGIN_SUCCESS} from "../actions/const";

export default (state = {
    token: null,
    userId: null,
}, action ) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
            }
        default:
            return state;
    }
};
