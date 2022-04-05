import React from "react";
import classNames from "classnames";
export const fieldTextarea = "TEXTAREA";

const isTextarea = (typeOfField) => typeof typeOfField === "string" && typeOfField.toUpperCase() === fieldTextarea;
const isLabel = (label) => typeof label === "string" && label.length;

export const renderField = ({ input, label, type = "text", autoComplete = "off", meta: {error} }) => {
    const classes = classNames(
        'form-control',
        {
            'is-invalid': error
        }
    );

    return (
        <div className="form-group">
            {isLabel(label) && <label>{label}</label>}
            {type && !isTextarea(type) && <input {...input} type={type} className={classes} autoComplete={autoComplete} />}
            {type && isTextarea(type) && <textarea {...input} className={classes}/>}
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};
