import superagentPromise from "superagent-promise";
import _sa from "superagent";

const superagent = superagentPromise(_sa, global.Promise);
export const API_HOST = "http://localhost:8000";
export const API_ROOT = `${API_HOST}/api`;
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
    upload: (url, file, secured = true) => superagent
        .post(`${API_ROOT}${url}`).attach("file", file).use(tokenPlugin(secured)).then(responseBody),
    delete: (url, secured = true, isAbsoluteUrl = false) => {
        const requestUrl = isAbsoluteUrl ? `${API_HOST}${url}` : `${API_ROOT}${url}`;

        return superagent.del(requestUrl).use(tokenPlugin(secured)).then(responseBody)
    },
    setToken: (newJwtToken) => token = newJwtToken,
};
