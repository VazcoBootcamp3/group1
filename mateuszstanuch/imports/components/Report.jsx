import React from 'react';

const ReportItem = (props) => {
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

const Report = (props) => {
    if(props.shoppings.length === 0) {
        return (
            <div className="row">
                <h3>Podsumowanie</h3>
                <h4>Nie posiadasz żadnych zobowiązań :)</h4>
            </div>
        );
    }

    return (
        <div className="row">
            <h3>Podsumowanie</h3>
            {(props.shoppings)
                .map((shopping, k) => <ReportItem key={k} info={shopping} functions={props.functions} /> )}
        </div>
    )
};

export default Report;