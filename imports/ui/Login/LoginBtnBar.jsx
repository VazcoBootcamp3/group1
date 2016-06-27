import React from 'react';

// material-ui
import RaisedButton from 'material-ui/RaisedButton';

const LoginBtnBar = ({handleLogin}) => 
	<div className="login-btn-bar">
	    <div className="login-new-account-box">
	        <a href="/register">Click here to create new account</a>
	    </div>
	    
	    <div className="login-btn">
	    <RaisedButton 
	        label="LOG IN"
	        primary={true}
	        className="login-btn"
	        onTouchTap={handleLogin}
	    />
	    </div>
	</div>;

export default LoginBtnBar;