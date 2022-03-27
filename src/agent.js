import superagentPromise from "superagent-promise";
import _sa from "superagent";

const superagent = superagentPromise(_sa, global.Promise);
const API_ROOT = "http://localhost:8000/api";
const responseBody = response => response.body;

let token = null;
const tokenPlugin = secured => {
    return (request) => {
        if (token && secured) {
            request.set("Authorization", `Bearer ${token}`)
        }
    }
}

export const requests = {
    get: (url, secured = false) => superagent
        .get(`${API_ROOT}${url}`).use(tokenPlugin(secured)).then(responseBody),
    post: (url, body = null, secured = true) => superagent
        .post(`${API_ROOT}${url}`, body).use(tokenPlugin(secured)).then(responseBody),
    setToken: (newJwtToken) => token = newJwtToken,
};
