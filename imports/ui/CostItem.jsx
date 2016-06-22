import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import CostItems from '../api/costItems';

export default class Item extends Component {

  setDebtPayed(e) {
    const items = CostItems.find({debtor: this.props.user.username}).fetch();
    for (var i in items) {
      Meteor.call('costItems.setPayed', items[i]._id, true);
    }
  }


  calculateMyDebtOrLoan(userId, calculateLoan=false) {
    const loggedUser = Meteor.user().username;
    const user = Meteor.users.findOne({_id: userId});
    if (!calculateLoan) {
      items = CostItems.find({debtor: loggedUser}).fetch();
    }
    else {
      items = CostItems.find({ $and: [{debtor: loggedUser}, {contractor: user.username}]}).fetch();
    }
    let debt = 0;
    for (var i in items) {
        if (!items[i].isPayed) {
          debt += items[i].moneyOwned;
        }
      }
    return debt;
  }

  calculateUserDebtorLoan(userId, calculateLoan=false) {
    const loggedUser = Meteor.user().username;
    const user = Meteor.users.findOne({_id: userId});
    let items;
    if (!calculateLoan) {
      items = CostItems.find({ $and: [{debtor: user.username}, {contractor: loggedUser}]}).fetch();
    }
    else {
      items = CostItems.find({contractor: user.username}).fetch();
    }
    let debt = 0;
    for (var i in items) {
        if (!items[i].isPayed) {
          debt += items[i].moneyOwned;
        }
      }
    return debt;
  }

  isLoggedUser() {
    return this.props.user.username === Meteor.user().username;
  }

  render() {
    return (
      <li key={this.props.user._id}  className="text teal-text text-darken-4">
        <div className="collapsible-header">
          {this.isLoggedUser() ?
          <span>Powinienem otrzymać: {this.calculateUserDebtorLoan(this.props.user._id, true)} PLN
           Jestem wininen innym w sumie: {this.calculateMyDebtOrLoan(this.props.user._id)} PLN</span>
          :
          <span>Otrzymam od: {this.props.user.username}: {this.calculateUserDebtorLoan(this.props.user._id)} PLN
          Jestem mu winien: {this.calculateMyDebtOrLoan(this.props.user._id, true)} PLN</span>

        }
        </div>
        <div className="collapsible-body white">
          {this.isLoggedUser() ?
            <p></p>
            : <p><a onClick={e => this.setDebtPayed(e)} className="waves-effect waves-teal teal darken-3  btn">Uregulowano</a>
            </p>
          }
        </div>
      </li>
  )
  }
};

Item.propTypes = {
  user: PropTypes.object.isRequired,
};
