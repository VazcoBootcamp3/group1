import React from 'react';
import {mount} from 'react-mounter';

import {AppLayout} from '/client/main.jsx';

import App from '/imports/ui/App.jsx';
import Login from '/imports/ui/Login.jsx';
import Register from '/imports/ui/Register.jsx';

// material-ui
import injectTapEventPlugin from 'react-tap-event-plugin';


injectTapEventPlugin();

FlowRouter.route('/', {
	action() {
		mount(AppLayout, {
			content: (<App />)
		});
	}
});

FlowRouter.route('/login', {
	action() {
		mount(AppLayout, {
			content: (<Login />)
		});
	}
});

FlowRouter.route('/register', {
	action() {
		mount(AppLayout, {
			content: (<Register />)
		});
	}
});