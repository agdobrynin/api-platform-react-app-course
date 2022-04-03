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

export const hydraMember = (collection) => collection["hydra:member"] ? collection["hydra:member"] : [];

export const hydraTotalItems = (collection) => collection["hydra:totalItems"] ? collection["hydra:totalItems"] : 0;

export const hydraPageCount = (collection) => {
    const key = "hydra:view";

    if (!collection[key]) {
        return 1;
    }

    return Number(
        collection[key]["hydra:last"].match(/page=(\d+)/)[1]
    );
};
