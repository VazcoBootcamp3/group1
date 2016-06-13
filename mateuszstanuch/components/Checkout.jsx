import React from 'react';

export default class extends React.Component {
    constructor (...args) {
        super(...args);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit (e) {
        e.preventDefault();

        let shopping = {
            buyer: this.refs.buyer.value,
            isBuyerGroup: false,
            indebted: this.refs.indebted.value,
            isIndebtedGroup: false,
            products: this.refs.products.value,
            price: this.refs.price.value,
            paid: false,
        };

        if(shopping.buyer !== "" && shopping.indebted !== "" && shopping.products !== "" && shopping.price !== "" ) {
            Meteor.call('checkout.create', shopping, (err, res) => {
                if (err) {
                    Materialize.toast(err, 4000);
                } else {
                    FlowRouter.go('Report');
                }
            });
        } else {
            Materialize.toast("Wypełnij wszystkie pola w formularzu", 4000);
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