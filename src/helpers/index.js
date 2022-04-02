export const apiError = (errorResponse) =>  {
    const violation = errorResponse?.body?.violations || [];

    return violation.reduce(
        (parsedErrors, violation) => {
            parsedErrors[violation["propertyPath"]] = violation["message"];
            return parsedErrors;
        },
        {}
    );
};

export const hydraPageCount = (collection) => {
    const key = "hydra:view";

    if (!collection[key]) {
        return 1;
    }

    return Number(
        collection[key]["hydra:last"].match(/page=(\d+)/)[1]
    );
};
