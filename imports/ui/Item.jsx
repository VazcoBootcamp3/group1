import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Item extends Component {

  render() {
    return (
      <div>
      <li className="card-panel cyan accent-1">
      <span className="text blue-text text-darken-2">Kupujący: {this.props.costItems.contractor}
       Lista produktów: {this.props.costItems.productsList} , Płaci: {this.props.costItems.debtor}</span>
       </li>
       </div>
  );
  }
};

// item.propTypes = {
//   costItems: PropTypes.object.isRequired,
// };
