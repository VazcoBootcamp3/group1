import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { Router, Route, Link, browserHistory } from 'react-router'

import App from '../imports/ui/App';
import RegisterUser from '../imports/ui/RegisterUser';
import LoginUser from '../imports/ui/LoginUser';
import Header from '../imports/ui/Header';

import CostItems from '../imports/api/costItems';


Meteor.startup(() => {
  render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="register" component={RegisterUser} />
    <Route path="login" component={LoginUser} />
  </Router>
), document.getElementById('render-target'))
});
