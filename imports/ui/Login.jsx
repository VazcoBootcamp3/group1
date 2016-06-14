import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class extends React.Component {
    render() {
        return(
            <div className="login-box">
                <header>LOG IN</header>
                <div className="login-fields">
                    <TextField
                        floatingLabelText="Username"
                        fullWidth={true}
                    />
                    <TextField
                        floatingLabelText="Password"
                        fullWidth={true}
                        type="password"
                    />
                    <RaisedButton 
                        label="LOG IN"
                        primary={true}
                        className="login-btn"
                    />
                </div>
            </div>
        );
    }

}