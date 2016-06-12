import React from 'react';

export default class extends React.Component {
    constructor (...args) {
        super(...args);
        this.onSubmit = this.onSubmit.bind(this);
        
        // check if 'shopping_list' exist in localStorage
        if(!localStorage.getItem('shopping_list')) {
            localStorage.setItem('shopping_list', JSON.stringify([]));
        }

        this.state = {
            shopping_list: JSON.parse(localStorage.getItem('shopping_list')),
        }
    
    }

    onSubmit (e) {
        e.preventDefault();

        let shopping = {
            id: new Date().getTime(),
            buyer: this.refs.buyer.value,
            indebted: this.refs.indebted.value,
            products: this.refs.products.value,
            price: this.refs.price.value,
            paid: false,
        };

        if(shopping.buyer !== "" && shopping.indebted !== "" && shopping.products !== "" && shopping.price !== "" ) {
            let shopping_list = JSON.parse(localStorage.getItem('shopping_list'));
            shopping_list.push(shopping);
            localStorage.setItem('shopping_list', JSON.stringify(shopping_list));
            this.setState({
                shopping_list: shopping_list,
            })

            FlowRouter.go('Report');
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