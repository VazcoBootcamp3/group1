import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { FlatMates } from '../api/users';

export default class Item extends Component {

  isItemForAllFlatmates() {
    return this.props.item.debtor === 'all';
  }

  setItemPayed(e) {
    if (!this.props.item.isPayed) {
      Meteor.call('costItems.setPayed', this.props.item._id, true);
    }
    else {
      Meteor.call('costItems.setPayed', this.props.item._id, false);
    }
  }

  renderItemText() {
    if (this.isItemForAllFlatmates()) {

    }
  }

  render() {
    const userCount = FlatMates.find({}).count();
    const totalMoney = this.props.item.moneyOwned;
    const itemClassName = this.props.item.isPayed ? 'checked' : '';
    let itemDebt = this.props.item.moneyOwned;
    let itemSharedCost = itemDebt;
    if (this.isItemForAllFlatmates()) {
      itemSharedCost = (totalMoney / userCount).toFixed(2);
      itemDebt = (totalMoney - itemSharedCost).toFixed(2);
    }

    return (
      <li key={this.props.item._id}  className="text teal-text text-darken-4">
        <div className="collapsible-header">
          <span className={itemClassName}>Zakupy z dnia: {this.props.item.createdAt},
           {this.isItemForAllFlatmates() ? ' Płacą wszyscy po ' + itemSharedCost + ' PLN. ': ' Płaci: ' +
            this.props.item.debtor + ': ' + itemSharedCost + ' PLN. '}<span>Do zwrotu dla: {this.props.item.contractor}</span>
           </span>
        </div>
        <div className="collapsible-body white">
            <p className={itemClassName}>Zakupy: {this.props.item.productsList}</p>
            <p className={itemClassName}>Cena całkowita: {this.props.item.moneyOwned} PLN.</p>
            <div className={itemClassName}>
            <p><a onClick={e => this.setItemPayed(e)} className="waves-effect waves-teal teal darken-3  btn">Uregulowano</a>
            </p>
            </div>
          </div>
      </li>
  )
  }
};

// Item.propTypes = {
//   item: PropTypes.object.isRequired,
// };
