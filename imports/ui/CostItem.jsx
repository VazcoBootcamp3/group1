import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';


export default class Item extends Component {

  setItemPayed(e) {
    if (Meteor.user().username === this.props.item.contractor) {
      if (!this.props.item.isPayed) {
        Meteor.call('costItems.setPayed', this.props.item._id, true);
      }
      else {
        Meteor.call('costItems.setPayed', this.props.item._id, false);
      }
    }
    else {
      Materialize.toast("Tylko ten który zapłacił za zakupy może zaznaczyć task jako zapłacony :)", 4000);
    }
  }

  render() {
    const loggedUser = Meteor.user();
    const loggedUserGroup = loggedUser.profile.group;
    const usersInGroup = Meteor.users.find({"profile.group": loggedUserGroup})
    const userCount = usersInGroup.count();
    const totalMoney = this.props.item.moneyOwned;
    const itemClassName = this.props.item.isPayed ? 'checked' : '';
    let itemDebt = this.props.item.moneyOwned;
    return (
      <li key={this.props.item._id}  className="text teal-text text-darken-4">
        <div className="collapsible-header">
          <span className={itemClassName}>Zakupy z dnia: {this.props.item.createdAt},
           Płaci: {this.props.item.debtor}: {itemDebt} PLN. <span>Do zwrotu dla: {this.props.item.contractor}</span>
           </span>
        </div>
        <div className="collapsible-body white">
            <p className={itemClassName}>Zakupy: {this.props.item.productsList}</p>
            <div className={itemClassName}>
            <p><a onClick={e => this.setItemPayed(e)} className="waves-effect waves-teal teal darken-3  btn">Uregulowano</a>
            </p>
            </div>
          </div>
      </li>
  )
  }
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};
