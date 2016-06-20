import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';

import NotificationSystem from 'react-notification-system';

export default class extends React.Component {
    componentDidMount() {
        this._notification = this.refs.notification;
    }

    _handleLogin(e) {
        e.preventDefault();

        const username = this.refs.username.getValue();
        const password = this.refs.password.getValue();

        if(!username || !password) {
            this._notification.addNotification({
                message: 'Please fill the required fields.',
                level: 'error',
                position: 'tc',
            });
            return;
        }

        Meteor.loginWithPassword(username, password, (error) => {
            if(error)
                this._notification.addNotification({
                    message: error.reason,
                    level: 'error',
                    position: 'tc',
                });
            else 
                FlowRouter.go('App');
        })
    }

    render() {
        return(
            <div className="login-box">
                <NotificationSystem ref="notification" className="notification" />

                <header>SIGN IN</header>

                <Subheader>Sign in with a social network:</Subheader>
                <div className="login-social-btn">
                    <IconButton
                        iconClassName="muidocs-icon-custom-github" 
                        tooltip="github"
                        tooltipPosition="top-right"
                    />
                </div>

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

                <div className="login-btn-bar">
                    <div className="login-new-account-box">
                        <a href="/register">Click here to create new account</a>
                    </div>
                    
                    <div className="login-btn">
                    <RaisedButton 
                        label="LOG IN"
                        primary={true}
                        className="login-btn"
                        onTouchTap={this._handleLogin.bind(this)}
                    />
                    </div>
                </div>
            </div>
        );
    }

}