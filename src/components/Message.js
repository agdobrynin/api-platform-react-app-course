import React from "react";

export class Message extends React.Component {
    render() {
        const {message, messageType = "alert-warning"} = this.props;
        const className = `alert ${messageType}`;

        return (
            <div className="mb-3 mt-3">
                <div className={className} role="alert">
                    {message}
                </div>
            </div>
        );
    }
};
