import React from 'react';

// TODO support groups
// TODO autocomplete for usernames/groupnames

export default class extends React.Component {
    constructor (...args) {
        super(...args);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit (e) {
        e.preventDefault();

        let shopping = {
            buyer: this.refs.buyer.value,
            indebted: this.refs.indebted.value,
            indebtedGroup: 'not supported',
            products: this.refs.products.value,
            price: this.refs.price.value,
        };

        if(shopping.buyer !== "" && shopping.indebted !== "" && shopping.buyer !== shopping.indebted && shopping.products !== "" && shopping.price !== "" ) {
            Meteor.call('checkout.create', shopping, (err, res) => {
                if (err) {
                    Materialize.toast(err.reason, 4000);
                } else {
                    Materialize.toast(res, 4000);
                    FlowRouter.go('Report');
                }
            });
        } else {
            if(shopping.indebted === shopping.buyer) {
                Materialize.toast("Kupujący i dłużny powinni być różnymi osobami", 4000);
            } else {
                Materialize.toast("Wypełnij wszystkie pola w formularzu", 4000);
            }
        }
    }

    render () {
        return (
            <div className="row">
                <form className="col s12" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="input-field col s4">
                            <input placeholder="Kupujący" ref="buyer" />
                        </div>
                        <div className="input-field col s4">
                            <input placeholder="Dłużny" ref="indebted" />
                        </div>
                        <div className="input-field col s4">
                            <input placeholder="Kwota" type="number" step="any" ref="price" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="shopping-list" className="materialize-textarea" ref="products" />
                            <label htmlFor="shopping-list">Lista zakupów</label>
                        </div>
                    </div>

                    <button className="waves-effect waves-light btn-large">Dodaj</button>
                </form>

            </div>
        ); 
    }
}