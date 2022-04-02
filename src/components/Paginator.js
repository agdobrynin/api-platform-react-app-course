import React from "react";
import classNames from "classnames";

export class Paginator extends React.Component {
    constructor(props) {
        super(props);
        const {pageCount} = this.props;
        this.pages = [];

        for (let i = 1; i <= pageCount; i++) {
            this.pages.push(i);
        }
    }

    render() {
        const {currentPage, setPage} = this.props;

        return (
            <nav>
                <ul className="pagination">
                    {this.pages.map( page => {
                        const onClick = e => {
                            e.preventDefault();
                            setPage(page);
                        };

                        return (
                            <li key={page} className={classNames("page-item", {active: currentPage === page})}>
                                <button className="page-link" onClick={onClick}> {page}</button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }
};
