import {USER_PROFILE_ERROR, USER_PROFILE_FETCHING, USER_PROFILE_RECEIVED, USER_SET_ID} from "../const";
import {requests} from "../../agent";

export const userProfileError = (userId) => {
    return {
        type: USER_PROFILE_ERROR,
        userId,
    }
};
export const userProfileFetching = () => {
    return {
        type: USER_PROFILE_FETCHING
    }
};
export const userProfileReceived = (userId, data) => {
    return {
        type: USER_PROFILE_RECEIVED,
        data,
        userId,
    }
};
export const userSetId = (userId) => {
    return {
        type: USER_SET_ID,
        userId,
    }
};
export const userProfileFetch = (userId) => {
    return (dispatch) => {
        dispatch(userProfileFetching());

        return requests.get(`/users/${userId}`, true)
            .then(response => dispatch(userProfileReceived(userId, response)))
            .catch(() => dispatch(userProfileError(userId)));
    }
};
