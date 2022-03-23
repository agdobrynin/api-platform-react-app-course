import superagentPromise from "superagent-promise";
import _sa from "superagent";

const superagent = superagentPromise(_sa, global.Promise);
const API_ROOT = "http://localhost:8000/api";
const responseBody = response => response.body;

export const requests = {
    get: (url) => superagent.get(`${API_ROOT}${url}`).then(responseBody),
};
