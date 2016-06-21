import {Meteor} from "meteor/meteor";
import React from 'react';
import {render} from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


import App from '/imports/ui/App.jsx';
import '/imports/api/items.js';
import '/imports/api/groups.js';
import '/imports/api/debts.js';
import '/imports/api/users.js';


export const AppLayout = ({content}) => (
	<MuiThemeProvider muiTheme={getMuiTheme()}>
		{content}
	</MuiThemeProvider>
);