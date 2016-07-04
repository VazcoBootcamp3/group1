import React from 'react';
import { ReportItem } from './ReportItem';

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