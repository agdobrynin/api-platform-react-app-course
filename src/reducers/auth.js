import {
    USER_LOGIN_ERROR,
    USER_LOGIN_FETCHING,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_PROFILE_RECEIVED,
    USER_SET_ID,
} from "../actions/const";

export default (state = {
    token: null,
    userId: null,
    isAuth: false,
    userProfile: null,
    isUserFetch: false,
}, action ) => {
    switch (action.type) {
        case USER_LOGOUT:
            return {
                ...state,
                userId: null,
                isAuth: false,
                userProfile: null,
            };
        case USER_SET_ID:
            return {
                ...state,
                userId: action.userId,
                isUserFetch: false,
            };
        case USER_LOGIN_FETCHING:
            return{
                ...state,
                isUserFetch: true,
            }
        case USER_LOGIN_ERROR:
            return {
                ...state,
                isUserFetch: false,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                isAuth: true,
                isUserFetch: false,
            }
        case USER_PROFILE_RECEIVED:
            return {
                ...state,
                userProfile: (state.userId === action.userId && state.userProfile === null)
                    ? action.data
                    : state.userProfile,
                isAuth: (state.userId === action.userId && action.data),
                isUserFetch: false,
            }
        default:
            return state;
    }
};
