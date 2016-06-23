import React from 'react';

// TODO get username instead of _id
// TODO shopping history
// TODO settle a debt

const getSummary = (shoppings) => {
    let shoppingsDict = {};
    for(let s of shoppings) {
        if( ! s.paid ) {
            if (s.buyer in shoppingsDict) {
                shoppingsDict[s.buyer] += s.price;
            } else {
                shoppingsDict[s.buyer] = s.price;
            }

            if (s.indebted in shoppingsDict) {
                shoppingsDict[s.indebted] -= s.price;
            } else {
                shoppingsDict[s.indebted] = -s.price;
            }
        }
    }

    let shoppingsSummary = [];
    for(let key in shoppingsDict) {
        shoppingsSummary.push({
            id: key,
            balance: shoppingsDict[key],
        });
    }

    return shoppingsSummary;
};

const ReportItem = (props) => {
    return (
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">{props.info.id}</span>
                        <p>
                            {props.info.balance}
                        </p>
                    </div>
                    <div className="card-action">
                        <a href="#!" onClick={() => { settleDebt(props.info.id) }}>Ureguluj</a>
                        <a href="#!">Pokaż historię zakupów</a>
                    </div>
                </div>
            </div>
    );
};

function settleDebt (id) {
    console.log('settle a debt beetwen you and ' + id + ' ' + Meteor.userId());
    Meteor.call( 'report.settle', {secondUser: id}, (err, res) => {
        if(err) {
            Materialize.toast(err.reason, 4000);
        } else {
            Materialize.toast(res, 4000);
        }
    });
}

const Report = (props) => {
    return (
        <div className="row">
                <h3>Podsumowanie</h3>
                {
                    (getSummary(props.shoppings))
                        .map((shopping, k) => <ReportItem key={k} info={shopping} /> )
                }
        </div>
    )
};

export default Report;