import React from 'react';

// material-ui
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

class LoginFormFields extends React.Component {
	render() {
		return(
			<div>
				<Subheader>or use this form:</Subheader>
				<div className="login-fields">
				<TextField
				    floatingLabelText="Username"
				    fullWidth={true}
				    ref="username"
				/>
				<TextField
				    floatingLabelText="Password"
				    fullWidth={true}
				    type="password"
				    ref="password"
				/>
				</div>
			</div>
		);
	}
}

export default LoginFormFields;