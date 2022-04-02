export const apiError = (errorResponse) =>  {
    const violation = errorResponse?.body?.violations || [];

    return violation.reduce(
        (parsedErrors, violation) => {
            parsedErrors[violation['propertyPath']] = violation['message'];
            return parsedErrors;
        },
        {}
    );
};
