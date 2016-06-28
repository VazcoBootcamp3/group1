import React from 'react';

// material-ui
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const RegisterStepperButtons = (props) => 
	<div className="login-btn-bar">
		{props.step > 0 && (
			<FlatButton
				label="Back"
				disableTouchRipple={true}
				disableFocusRipple={true}
				onTouchTap={props.handlePrev}
			/>
		)}
		<RaisedButton
			label={props.step == 2 ? 'Finish' : 'Next'}
			disableTouchRipple={true}
			disableFocusRipple={true}
			primary={true}
			onTouchTap={props.handleNext}
			className="login-btn"
		/>
	</div>;


export default RegisterStepperButtons;