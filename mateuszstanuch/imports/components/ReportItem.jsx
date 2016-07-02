import React from 'react';

export const ReportItem = (props) => {
    return (
        <div className="col s12 m6">
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">{props.info.name}</span>
                    <p>
                        {props.info.balance}
                    </p>
                </div>
                <div className="card-action">
                    <a href="#!" onClick={() => { props.functions.settleDebt(props.info.id) }}>Ureguluj</a>
                </div>
            </div>
        </div>
    );
};