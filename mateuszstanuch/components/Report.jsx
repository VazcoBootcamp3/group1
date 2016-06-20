import React from 'react';

// TODO get username instead of _id
// TODO shopping history
// TODO settle a debt

const getSummary = (shoppings) => {
    let shoppingsDict = {};
    for(let s of shoppings) {
        if(s.buyer in shoppingsDict) {
            shoppingsDict[s.buyer] += s.price;
        } else {
            shoppingsDict[s.buyer] = s.price;
        }

        if(s.indebted in shoppingsDict) {
            shoppingsDict[s.indebted] -= s.price;
        } else {
            shoppingsDict[s.indebted] = s.price;
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
                        <a href="#not-implemented-yet">Ureguluj</a>
                        <a href="#not-implemented-yet">Pokaż historię zakupów</a>
                    </div>
                </div>
            </div>
    );
};

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