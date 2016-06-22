import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';


export default class UserSelect extends Component {

render() {
  return <option value={this.props.user._id}>Zakup dla: {this.props.user.username}</option>
}

}
