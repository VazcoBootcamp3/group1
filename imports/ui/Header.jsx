import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class Header extends Component {

  logOut(e) {
    e.preventDefault();
    var self = this;
    Meteor.logout(function(){
      self.context.router.push('/');
    });
  }

  isUserLogged() {
    if (Meteor.user()) {
      return true;
    }
    return false;
  }

  renderAnonimUserNav() {
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><Link to="login">Zaloguj się</Link></li>
      <li><Link to="register">Zarejestruj się</Link></li>
      </ul>
    )
  }

  renderLoggedUserNav() {
    return (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li>Użytkownik: {Meteor.user().username}</li>
      <li><a onClick={(e) => this.logOut(e)}>Wyloguj się</a></li>
      </ul>
    )
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper teal darken-4">
          <img height="65" width="65"
          src="https://api.icons8.com/download/16e39063cf7f72a497ae57d67086817378c225d4/Android_L/PNG/256/Very_Basic/home-256.png" />
          Paweł i Gaweł w jednym stali domu...

            { this.isUserLogged() ?  this.renderLoggedUserNav() : this.renderAnonimUserNav()}

        </div>
      </nav>
    )
  }
}

Header.contextTypes = {
     router: React.PropTypes.object.isRequired
}
