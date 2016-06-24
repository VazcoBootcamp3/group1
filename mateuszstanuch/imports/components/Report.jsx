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
                        <a href="#!" onClick={() => { settleDebt(props.info.id) }}>Ureguluj</a>
                    </div>
                </div>
            </div>
    );
};

function settleDebt (id) {
    Meteor.call( 'report.settle', {secondUser: id}, (err, res) => {
        if(err) {
            Materialize.toast(err.reason, 4000);
        } else {
            Materialize.toast(res, 4000);
        }
    });
}

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
                .map((shopping, k) => <ReportItem key={k} info={shopping} /> )}
        </div>
    )
};

export default Report;