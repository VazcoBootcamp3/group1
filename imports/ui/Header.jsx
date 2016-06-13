import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, Link, browserHistory } from 'react-router'

export default class Header extends Component {

  render() {
    return (
      <nav>
        <div className="nav-wrapper teal darken-4">
          <Link to='/' className="brand-logo"><img height="65" width="65"
          src="https://api.icons8.com/download/16e39063cf7f72a497ae57d67086817378c225d4/Android_L/PNG/256/Very_Basic/home-256.png" />
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="register">Zarejestruj się</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}
