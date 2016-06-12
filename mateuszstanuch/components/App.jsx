import React from 'react';

import Report from '/components/Report';

export default class extends React.Component {
    constructor (...args) {
        super(...args);
        this.addShopping = this.addShopping.bind(this);
        
        // check if 'shopping_list' exist in localStorage
        if(!localStorage.getItem('shopping_list')) {
            localStorage.setItem('shopping_list', JSON.stringify([]));
        }

        this.state = {
            shopping_list: JSON.parse(localStorage.getItem('shopping_list')),
        }
    
    }

    componentWillMount() {
        this.setState({
            shopping_list: JSON.parse(localStorage.getItem('shopping_list')),
        });
    }

    addShopping () {
        let shopping = {
            id: new Date().getTime(),
            buyer: this.refs.buyer.value,
            indebted: this.refs.indebted.value,
            products: this.refs.products.value,
            price: this.refs.price.value,
            paid: false,
        };

        let shopping_list = JSON.parse(localStorage.getItem('shopping_list'));
        shopping_list.push(shopping);
        localStorage.setItem('shopping_list', JSON.stringify(shopping_list));
        this.setState({
            shopping_list: shopping_list,
        })
    }

    render () {
        return (
            <div>
                <header>
                    <h1>Domowe rozliczenia</h1>
                </header> 
                <section>
                    <label>Kupujący</label>
                    <input ref="buyer" />

                    <label>Dłużny</label>
                    <input ref="indebted" />

                    <label>Kwota</label>
                    <input type="number" step="any" ref="price" />

                    <br />

                    <label>Lista zakupów</label>
                    <textarea ref="products" />

                    <button onClick={this.addShopping}>Dodaj</button>
                </section>
                <Report shopping_list={this.state.shopping_list} />
            </div>  
        ); 
    }
}