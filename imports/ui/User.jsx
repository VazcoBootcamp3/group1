import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

export default class User extends Component {

  render() {
    return (
        <div className="chip">{this.props.user.username}</div>
      )

  }
};

User.propTypes = {
    user: PropTypes.object.isRequired,
  };
