export const apiError = (error) =>  {
    const violation = error?.response?.body?.violations || [];

    return violation.reduce(
        (parsedErrors, violation) => {
            parsedErrors[violation['propertyPath']] = violation['message'];
            return parsedErrors;
        },
        {}
    );
};
