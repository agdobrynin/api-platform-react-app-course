import {USER_LOGIN_ERROR, USER_LOGIN_FETCHING, USER_LOGIN_SUCCESS, USER_PROFILE_RECEIVED} from "../actions/const";

export default (state = {
    token: null,
    userId: null,
    isAuth: false,
    userProfile: null,
    isFetching: false,
}, action ) => {
    switch (action.type) {
        case USER_LOGIN_FETCHING:
            return{
                ...state,
                isFetching: true,
            }
        case USER_LOGIN_ERROR:
            return {
                ...state,
                isFetching: false,
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                isAuth: true,
                isFetching: false,
            }
        case USER_PROFILE_RECEIVED:
            return {
                ...state,
                userProfile: (state.userId === action.userId && state.userProfile === null)
                    ? action.data
                    : state.userProfile,
                isAuth: (state.userId === action.userId && state.userProfile),
                isFetching: false,
            }
        default:
            return state;
    }
};
