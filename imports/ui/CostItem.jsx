import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Item extends Component {

  render() {
    return (
      <div className="text blue-text text-darken-2 collection-item">({this.props.item.createdAt}): {this.props.item.productsList} :
      <span>Pieniądze do zwrotu dla: {this.props.item.contractor} </span>
      <span>Pieniądze oddaje: {this.props.item.debtor} </span>
      <span>Kwota: {this.props.item.moneyOwned} PLN</span>
      </div>
  );
  }
};

// Item.propTypes = {
//   costItems: PropTypes.object.isRequired,
// };

//TODO: if in comonent - dla all i pojedynczych - kwota albo cała albo dzielona
