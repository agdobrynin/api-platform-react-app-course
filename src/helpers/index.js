export const apiViolation = (errorResponse) =>  {
    const violation = errorResponse?.body?.violations || [];

    return violation.reduce(
        (parsedErrors, violation) => {
            parsedErrors[violation["propertyPath"]] = violation["message"];
            return parsedErrors;
        },
        {}
    );
};

export const apiError = (errorResponse) => {
    const hasError = errorResponse?.body["@type"] === "hydra:Error";

    if (null === hasError) {
        return null;
    }

    return errorResponse?.body["hydra:description"] || null;
}

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

const canWritePostRoles = ["ROLE_USER", "ROLE_ADMIN"];

export const canWritePost = (userProfile) => {
    const { roles = [] } = userProfile || {};

    return Array.isArray(roles) ? Boolean(roles.find(role => canWritePostRoles.indexOf(role) >= 0)) : false;
}
