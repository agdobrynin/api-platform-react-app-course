import React from "react";

export const renderField = ({ input, label, type, autoComplete = "off", meta: {error} }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input {...input} type={type} className="form-control" autoComplete={autoComplete} />
        </div>
    );
};
