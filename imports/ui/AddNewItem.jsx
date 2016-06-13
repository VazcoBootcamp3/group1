import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { FlatMates } from '../api/users';


export default class AddNewItem extends Component {

  getDebtor(debtor) {
    debtorUser = Meteor.users.findOne({username: debtor});
    if (debtor.toLowerCase() === 'all') {
      return debtor.toLowerCase();
    }
    else if (debtorUser) {
      return debtorUser.username;
    }
    else {
      return false;
    }
  }

  // validateContractor(contractor) {
  //   if (Meteor.users.findOne({nick: contractor})) {
  //     return true;
  //   }
  //   return false;
  // }

  handleNewItemSubmit(e) {
      e.preventDefault();

      const productsList = this.refs.productsListInput.value.trim();
      const money = parseFloat(parseFloat(this.refs.moneyInput.value.trim()).toFixed(2));
      const debtor = this.refs.debtorInput.value.trim();
      if (productsList.length < 3) {
        Materialize.toast("Podaj jakie produkty kupiłeś", 2000);
      }
      else {
        var debtorOrDebtors = this.getDebtor(debtor);
        if (!debtorOrDebtors) {
          Materialize.toast("Nie mamy takiego współlokatora - sprawdz listę na dole strony lub dodaj nowego :)", 2000);
        }
        else {
          Meteor.call("costItems.insert", productsList, money, debtorOrDebtors);
          this.refs.productsListInput.value = '';
          this.refs.moneyInput.value = '';
          this.refs.debtorInput.value = '';
          Materialize.toast("Dodano zakupy - patrz 'Raport'", 5000);
        }

      }
    }

    getUserSelectValues(withAll) {
      // TODO
      // Dużo wydajniej jest iterować po kursorze z mongo:
      //
      // const users = Users.find().map(function (user) {
      //     return {value: user.nick, label: user.nick};
      //     });
      let options = [];
      if (withAll) {
        options.push({value: 'all', label: 'all'});
      }
      const users = Meteor.users.find({}).fetch();
      for (var user in users) {
        options.push({value: users[user].nick, label: users[user].nick})
      }
      return options;
    }

  render() {
    return (
      <div className="new-cost-item-form">
        <form className="card-panel center col s6" onSubmit={e => this.handleNewItemSubmit(e)}>
          <div className="row">
            <div className="input-field col s12">
              <input placeholder="Lista produktów" id="productsList" ref="productsListInput" type="text"/>
            </div>
            <div className="input-field col s2">
              <input placeholder="Kwota zakupów" id="moneyOwned" ref="moneyInput" type="text"/>
            </div>
            <div className="input-field col s4">
              <input placeholder="Dla kogo? Wpisz: all lub nick osoby" id="debtor" ref="debtorInput" type="text"/>
            </div>
            <div className="col s3">
              <button className="teal darken-4 btn waves-effect waves-light" type="submit" onClick={e => this.handleNewItemSubmit(e)}>Dodaj</button>
            </div>
          </div>
          <div className="col s12">

      </div>

        </form>
      </div>
    )
  }
}
