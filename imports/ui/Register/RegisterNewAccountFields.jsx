import React from 'react';

// material-ui
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

class RegisterNewAccountFields extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showPassword: false,
		}; 
	}

    _showPassword() {
        this.setState({
            showPassword: !this.state.showPassword,  
        });
    }

	render() {
		return(
			<div>
	        	<div className="login-fields">
	                <TextField
	                    floatingLabelText="Username"
	                    fullWidth={true}
	                    ref="username"
	                    // defaultValue={this.state.account.username}
	                />

	                <TextField
	                    floatingLabelText="Password"
	                    fullWidth={true}
	                    type={this.state.showPassword ? "text" : "password"}
	                    ref="password"
	                />

	                <Toggle
	                    label="Show my password"
	                    labelPosition="right"
	                    onToggle={this._showPassword.bind(this)}
	                />

	                <TextField
	                    floatingLabelText="Email"
	                    fullWidth={true}
	                    ref="email"
	                    // defaultValue={this.state.account.email}
	                />

	                <TextField
	                    floatingLabelText="Phone number"
	                    fullWidth={true}
	                    ref="phone"
	                    // defaultValue={this.state.account.profile.phone}
	                />
	                
	                <TextField
	                    floatingLabelText="Avatar URL (optional)"
	                    fullWidth={true}
	                    ref="avatar"
	                    // defaultValue={this.state.account.profile.avatar}
	                />

	            </div>
	        </div>
		);
	}
}

export default RegisterNewAccountFields;