import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import UserSelect from './UserSelect';

export default class AddNewItem extends Component {

  constructor(...args) {
      super(...args);
      this.state = {
        selectedUser: '0',
      };
    }

  handleNewItemSubmit(e) {
      e.preventDefault();

      const productsList = this.refs.productsListInput.value.trim();
      const money = parseFloat(parseFloat(this.refs.moneyInput.value.trim()).toFixed(2));
      const debtor = this.state.selectedUser;
      if (productsList.length < 3) {
        Materialize.toast("Podaj jakie produkty kupiłeś", 2000);
      }
      else {
        if (debtor === "0") {
          Meteor.call("costItems.insert", productsList, money, 'all')
        }
        else {
          const debtorUsername = Meteor.users.findOne({_id: debtor}).username;
          Meteor.call("costItems.insert", productsList, money, debtorUsername);
        }
        this.refs.productsListInput.value = '';
        this.refs.moneyInput.value = '';
        Materialize.toast("Dodano zakupy - patrz 'Raport'", 5000);
      }
    }

    getUserSelectValues(withAll) {
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

    renderUserSelect() {
      const loggedUser =  Meteor.user();
      if (loggedUser) {
        const loggedUserGroup = loggedUser.profile.group;
        let filteredUsers = Meteor.users.find({}).fetch();
        filteredUsers = filteredUsers.filter(user => user.profile.group === loggedUserGroup && user._id !== loggedUser._id);
        return filteredUsers.map((user) => (<UserSelect key={user._id} user={user} />));
      }
    }


    handleUserSelectChange(e) {
      this.setState({
        selectedUser: e.target.value,
      });
    }

  render() {
    return (
      <div className="new-cost-item-form">
        <form className="card-panel center col s6" onSubmit={e => this.handleNewItemSubmit(e)}>
          <div className="row">
            <div className="input-field col s10">
              <input placeholder="Lista produktów" id="productsList" ref="productsListInput" type="text"/>
            </div>
            <div className="input-field col s2">
              <input placeholder="Kwota zakupów" id="moneyOwned" ref="moneyInput" type="text"/>
            </div>
            <div className="input-field col s8">
              <select onChange={e => this.handleUserSelectChange(e)} className="browser-default">
                <option value='0'>Zakup dla: wszyscy</option>
                {this.renderUserSelect()}
              </select>
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
