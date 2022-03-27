import React from "react";

export class Loader extends React.Component {
    render() {
        const {message = "Loading data"} = this.props;

        return (
            <div className="card mb-3 mt-3 shadow-sm">
                <div className="card-body">
                    <i className="fas fa-spinner fa-spin"></i> {message}
                </div>
            </div>
        );
    }
}
