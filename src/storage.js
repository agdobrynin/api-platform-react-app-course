const jwtKey = 'JWT';
const userKey = 'UserId';

export const storage = {
    setToken: (token) => window.localStorage.setItem(jwtKey, token),
    getToken: () =>  window.localStorage.getItem(jwtKey),
    setUserId: (userId) => window.localStorage.setItem(userKey, userId),
    getUserId: () => window.localStorage.getItem(userKey),
};
