import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Users } from '../api/users';

export default class AddNewUser extends Component {

  handleUserSubmit(e) {
    e.preventDefault();
    const nick = this.refs.nickInput.value.trim();
    if (!nick) {
      Materialize.toast("Podaj nick nowego współlokatora!", 2000);
    }
    else {

      if (Users.findOne({nick: nick})) {
        Materialize.toast("Taki nick współlokatora został już dodany wczesniej!", 2000);
      }
      else {
        Meteor.call("users.insert", nick);
        Materialize.toast("Współlokator: '" + nick + "' został dodany!", 2000);
        this.refs.nickInput.value = '';
      }

    }
  }

  render() {
    return (
      <div className="users card-panel center">
        <div className="row">
        <form onSubmit={e => this.handleUserSubmit(e)}>
          <div className="input-field col s12">
          <input placeholder="Dodaj nowego współlokatora - podaj jego ksywkę" id="first_name" ref="nickInput" type="text" className="validate"/>
          </div>
          </form>
        </div>
      </div>
      )
    }
}

AddNewUser.propTypes = {
  users: PropTypes.array.isRequired,
};
