import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { Router, Route, Link, browserHistory } from 'react-router'

import App from '../imports/ui/App';
import RegisterUser from '../imports/ui/RegisterUser';
import Header from '../imports/ui/Header';

import CostItems from '../imports/api/costItems';
import { FlatMates } from '../imports/api/users';


Meteor.startup(() => {
  render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="register" component={RegisterUser} />
  </Router>
), document.getElementById('render-target'))
});
