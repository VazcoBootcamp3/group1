import React from 'react';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {red100, green100} from 'material-ui/styles/colors';

const DialogButtons = (props) =>
	<div>
	    <RaisedButton
		    backgroundColor={green100}
		    icon={<FontIcon className="material-icons">done</FontIcon>}
		    onTouchTap={props.handleDone}
		/>
		<RaisedButton
		    backgroundColor={red100}
		    icon={<FontIcon className="material-icons">clear</FontIcon>}
		    onTouchTap={props.handleClose}
		/>
	</div>;

// props
// handleDone
// handleClose

export default DialogButtons;

