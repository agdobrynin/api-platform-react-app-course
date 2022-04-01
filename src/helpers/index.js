export const apiError = (error) =>  error?.response?.body['hydra:description'] || error.message || error;
