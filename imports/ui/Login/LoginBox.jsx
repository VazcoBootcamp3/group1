import React from 'react';

// Login
import LoginSocialMedia from '/imports/ui/Login/LoginSocialMedia';
import LoginFormFields from '/imports/ui/Login/LoginFormFields';
import LoginBtnBar from '/imports/ui/Login/LoginBtnBar';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';

import NotificationSystem from 'react-notification-system';

export default class extends React.Component {
    componentDidMount() {
        this._notification = this.refs.notification;
        this._form = this.refs.form.refs;
    }

    _handleLogin(e) {
        e.preventDefault();

        const username = this._form.username.getValue();
        const password = this._form.password.getValue();

        if(!username || !password) {
            this._notification.addNotification({
                message: 'Please fill the required fields.',
                level: 'error',
                position: 'tr',
            });
            return;
        }

        Meteor.loginWithPassword(username, password, (error) => {
            if(error)
                this._notification.addNotification({
                    message: error.reason,
                    level: 'error',
                    position: 'tr',
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

                <LoginSocialMedia />
                <LoginFormFields ref="form" />

                <LoginBtnBar handleLogin={this._handleLogin.bind(this)} />
            </div>
        );
    }

}