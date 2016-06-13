import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class LoginUser extends Component {

onSubmit(e) {
  e.preventDefault();

  const username = this.refs.usernameLogin.value.trim();
  const password = this.refs.passwordLogin.value.trim();

  if (username && password) {
    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        Materialize.toast(err.reason, 4000);
      }
      else {
        this.context.router.push('/');
      }
    });
  }
  else {
    Materialize.toast("Pola nie mogą być puste!", 4000);
  }
}

render() {
  return (
    <div className="row">
      <h4 className="text-center center">Logowanie</h4>
      <form onSubmit={e => this.onSubmit(e)} className="col offset-s4 s4">
        <div className="row">
          <div className="input-field col s12">
            <input placeholder="Ksywka" id="username" ref="usernameLogin" type="text" className="validate white" />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input placeholder="Hasło" id="password" ref="passwordLogin" type="password" className="validate white" />
          </div>
        </div>
        <div className="row center">
          <button className="teal darken-4 waves-effect waves-light btn btn-block">Zaloguj się</button>
        </div>
      </form>
    </div>
  )
}

}

LoginUser.contextTypes = {
     router: React.PropTypes.object.isRequired
}
