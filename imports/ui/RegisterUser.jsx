import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class RegisterUser extends Component {

  onSubmit(e) {
    e.preventDefault();

    const username = this.refs.usernameInput.value.trim();
    const password = this.refs.passwordInput.value.trim();
    const confirmPassword = this.refs.confirmPasswordInput.value.trim();
    const group = this.refs.groupInput.value.trim();

    if(password && username && group && password === confirmPassword) {
      const accountInfo = {
        username: username,
        password: password,
        profile: {
          group: group,
          balance: 0
        }
      }
      Accounts.createUser(accountInfo, (err) => {
        if (err) {
          Materialize.toast(err.reason, 4000);
        }
        else {
          Meteor.loginWithPassword(username, password, (err) => {
            if (err) {
              Materialize.toast(err.reason, 4000);
            }
            else {
              this.context.router.push('/');
            }
          })
        }
      });
    }
    else {
      if (password !== confirmPassword) {
        Materialize.toast("Hasła nie pasują do siebie!", 4000);
      }
      else {
        Materialize.toast("Niepoprawne dane rejestracji uzytkownika! Wszystkie dane muszą być podane!", 4000);
      }
    }

  }

  render() {
    return (
      <div className="row">
				<h4 className="text-center center">Rejestracja uzytkownika</h4>
				<form onSubmit={e => this.onSubmit(e)} className="col offset-s4 s4">
					<div className="row">
						<div className="input-field col s12">
							<input placeholder="Ksywka" id="username" ref="usernameInput" type="text" className="validate white" />
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input placeholder="Hasło" id="password" ref="passwordInput" type="password" className="validate white" />
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input placeholder="Powtorz hasło" id="confirmPassword" ref="confirmPasswordInput" type="password" className="validate white" />
						</div>
					</div>
          <div className="row">
						<div className="input-field col s12">
							<input placeholder="Twoja grupa (np. adres mieszkania)" id="group" ref="groupInput" type="text" className="validate white" />
						</div>
					</div>
					<div className="row center">
						<button className="teal darken-4 waves-effect waves-light btn btn-block">Zarejestruj się</button>
					</div>
				</form>
			</div>
      )
    }
}

RegisterUser.contextTypes = {
     router: React.PropTypes.object.isRequired
}
