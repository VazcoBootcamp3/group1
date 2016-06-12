import React from 'react';
import {mount} from 'react-mounter';

import AppLayout from '../components/App';
import Login from '../components/Login';
import Register from '../components/Register';
import Checkout from '../components/Checkout';
import Report from '../components/Report';
import Hello from '../components/Hello';

FlowRouter.route("/", {
    name: 'Home',
    action () {
        mount(AppLayout, {
            content: <Hello />
        });
    }
});

FlowRouter.route("/login", {
    name: 'Login',
    action () {
        mount(AppLayout, {
            content: <Login />
        });
    }
});

FlowRouter.route("/register", {
    name: 'Register',
    action () {
        mount(AppLayout, {
            content: <Register />
        });
    }
});

FlowRouter.route('/report', {
    name: 'Report',
    action () {
        mount(AppLayout, {
            content: <Report />
        })
    }
});

FlowRouter.route("/checkout", {
    name: 'Checkout',
    action () {
        mount(AppLayout, {
            content: <Checkout />
        })
    }
});

FlowRouter.notFound = {
  action () {
      mount(AppLayout, {
        content: "Nie znaleziono takiej strony"
      })
  }
};