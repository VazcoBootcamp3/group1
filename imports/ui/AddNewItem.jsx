import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Users } from '../api/users';

export default class AddNewItem extends Component {

  getDebtor(debtor) {
    debtorUser = Users.findOne({nick: debtor});
    if (debtor.toLowerCase() === 'all') {
      return debtor.toLowerCase();
    }
    else if (debtorUser) {
      return debtorUser;
    }
    else {
      return false;
    }
  }

  validateContractor(contractor) {
    if (Users.findOne({nick: contractor})) {
      return true;
    }
    return false;
  }

  handleNewItemSubmit(e) {
      e.preventDefault();

      const productsList = this.refs.productsListInput.value.trim();
      const money = parseFloat(parseFloat(this.refs.moneyInput.value.trim()).toFixed(2));
      const contractor = this.refs.contractorInput.value.trim();
      const debtor = this.refs.debtorInput.value.trim();
      if (productsList.length < 3) {
        Materialize.toast("Podaj jakie produkty kupiłeś", 2000);
      }
      else if (!this.validateContractor(contractor)) {
        Materialize.toast("Nie mamy cię na liście - wpisz swój nick tak jak w liście na dole strony", 2000);
      }
      else {
        var debtorOrDebtors = this.getDebtor(debtor);
        if (!debtorOrDebtors) {
          Materialize.toast("Nie mamy takiego współlokatora - sprawdz listę na dole strony lub dodaj nowego :)", 2000);
        }
        else {
          Meteor.call("costItems.insert", productsList, money, contractor, debtorOrDebtors);
          this.refs.productsListInput.value = '';
          this.refs.moneyInput.value = '';
          this.refs.contractorInput.value = '';
          this.refs.debtorInput.value = '';
          Materialize.toast("Dodano zakupy - patrz 'Raport'", 5000);
        }

      }
    }

  render() {
    return (
      <div className="new-cost-item-form">
        <form className="card-panel center col s6" onSubmit={e => this.handleNewItemSubmit(e)}>
          <div className="row">
            <div className="input-field col s9">
              <input placeholder="Lista produktów" id="productsList" ref="productsListInput" type="text"/>
            </div>
            <div className="input-field col s3">
              <input placeholder="Kwota zakupów" id="moneyOwned" ref="moneyInput" type="text"/>
            </div>
            <div className="input-field col s6">
              <input placeholder="Kupujący" id="contractor" ref="contractorInput" type="text"/>
            </div>
            <div className="input-field col s6">
              <input placeholder="Dla kogo zakupy? Wpisz: all lub nick osoby" id="debtor" ref="debtorInput" type="text"/>
            </div>
          </div>
          <button className="teal darken-4 btn waves-effect waves-light" type="submit" onClick={e => this.handleNewItemSubmit(e)}>Dodaj</button>
        </form>
      </div>
    )
  }
}
