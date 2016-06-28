import React from 'react';
import {mount} from 'react-mounter';

import {AppLayout} from '/client/main.jsx';

import App from '/imports/ui/App.jsx';
import LoginBox from '/imports/ui/Login/LoginBox.jsx';
import RegisterBox from '/imports/ui/Register/RegisterBox.jsx';
import {RegisterContainer} from '/imports/containers/Register/RegisterContainer';

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
			content: (<LoginBox />)
		});
	}
});

FlowRouter.route('/register', {
	name: 'Register',
	triggersEnter: [redirectIfLoggedIn],
	action() {
		mount(AppLayout, {
			content: (<RegisterContainer />)
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