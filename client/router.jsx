import React from 'react';
import {mount} from 'react-mounter';

import {AppLayout} from '/client/main.jsx';

import App from '/imports/ui/App.jsx';
import Login from '/imports/ui/Login.jsx';
import Register from '/imports/ui/Register.jsx';

// material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

function checkLoggedIn() {
	if(!Meteor.userId())
		FlowRouter.go('Login');
}

function redirectIfLoggedIn() {
	if(Meteor.userId())
		FlowRouter.go('App');
}


FlowRouter.route('/', {
	name: 'App',
	triggersEnter: [checkLoggedIn],
	action() {
		mount(AppLayout, {
			content: (<App />)
		});
	}
});

FlowRouter.route('/login', {
	name: 'Login',
	triggersEnter: [redirectIfLoggedIn],
	action() {
		mount(AppLayout, {
			content: (<Login />)
		});
	}
});

FlowRouter.route('/register', {
	name: 'Register',
	triggersEnter: [redirectIfLoggedIn],
	action() {
		mount(AppLayout, {
			content: (<Register />)
		});
	}
});

// temporary
FlowRouter.route('/logout', {
	action() {
		Meteor.logout();
		FlowRouter.go('Login');
	}
});