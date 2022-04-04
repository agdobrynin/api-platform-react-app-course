import React from "react";

export class Message extends React.Component {
    render() {
        const {message, messageType = "alert-warning", title} = this.props;
        const className = `alert ${messageType}`;

        return (
            <div className="mb-3 mt-3">
                <div className={className} role="alert">
                    {title && (<span><h6>{title}</h6><hr/></span>)}
                    {message}
                </div>
            </div>
        );
    }
};
