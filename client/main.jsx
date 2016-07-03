import {Meteor} from "meteor/meteor";
import React from 'react';
import {render} from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from '/imports/ui/App.jsx';


export const AppLayout = ({content}) => (
	<MuiThemeProvider muiTheme={getMuiTheme()}>
		{content}
	</MuiThemeProvider>
);