import React from 'react';
import {Random} from 'meteor/random';

// /Register components
import RegisterStepper from '/imports/ui/Register/RegisterStepper';
import RegisterNewAccountFields from '/imports/ui/Register/RegisterNewAccountFields';
import RegisterBtnBar from '/imports/ui/Register/RegisterBtnBar';

import NotificationSystem from 'react-notification-system';

export class RegisterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {profile: {}},
        }

        this._notificationSuccess = this._notificationSuccess.bind(this);
        this._notificationError = this._notificationError.bind(this);
    }

    _notificationSuccess(message) {
        this.refs.notification.addNotification({
            message: message,
            level: 'success',
            position: 'tr',
        });
    }

    _notificationError(message) {
        this.refs.notification.addNotification({
            message: message,
            level: 'error',
            position: 'tr',
        });
    }

    _validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    _validatePhone(number) {
        const re = /^[5-9]\d{8}$/;
        return re.test(number);
    }

    _handleNewAccount() {
        const newAccountForm = this.refs.RegisterStepper.refs.RegisterNewAccountFields.refs;

        const username = newAccountForm.username.getValue();
        const password = newAccountForm.password.getValue();
        const email = newAccountForm.email.getValue();
        const phone = newAccountForm.phone.getValue();
        const avatar = newAccountForm.avatar.getValue();


        if(!username || !password || !email || !phone) {
            this._notificationError('You must fill the required fields.');
            return;
        }

        if(username.length <= 3) {
            this._notificationError('Username must be longer than 3 characters.');
            return;
        }

        if(password.length <= 3) {
            this._notificationError('Password must be longer than 3 characters.');
            return;
        }

        if(!this._validateEmail(email)) {
            this._notificationError('Email address is incorrect.');
            return;
        }

        if(!this._validatePhone(phone)) {
            this._notificationError('Phone number is incorrect.');
            return;
        }

        Meteor.call('user.exists', username, email, (error, result) => {
            if(error) {
                this._notificationError(error);
                return;
            }

            if(result === true) {
                this._notificationError('Username or email is already taken.');
            }
            else {
                this.setState({
                    username: username,
                    password: password,
                    email: email,
                    phone: phone,
                    avatar: avatar || `https://api.adorable.io/avatars/128/${email}.png`,
                });

                this._notificationSuccess('OK. It looks good.\nNow you must choose the group.');
                
                // temporary bypass
                this.refs.RegisterStepper._nextStep();
            }
        });
        return true;
    }

    _handleGroup() {
        const {groupId, groupName, checked} = this.refs.RegisterStepper.refs.RegisterGroup.state;

        if(!groupName) {
            this._notificationError('You must choose one of groups.');
            return;
        }

        this.setState({
            groupId: groupId,
            groupName: groupName,  
        });

        return true;
    }

    _handleSummary() {
        const userId = Random.id();

        Meteor.call('groups.exists', this.state.groupName, (error, result) => {
            if(error) {
                this._notificationError(error);
                return;
            }

            if(!result) {
                Meteor.call('groups.create', this.state.groupName, userId);
                this._notificationSuccess('Group ' + this.state.groupName + ' has been created.');
            }
            
            Meteor.call('groups.getId', this.state.groupName, (err, data) => {
                if(data) {
                    const account = {
                        username: this.state.username,
                        password: this.state.password,
                        email: this.state.email,
                        profile: {
                            phone: this.state.phone,
                            avatar: this.state.avatar,
                            group: data,
                        },
                    };

                    Accounts.createUser(account, (error) => {
                        if(error) {
                            this._notificationError(error.reason);
                            return;
                        }
                        else {
                            this._notificationSuccess('Your account has been created.');

                            Meteor.loginWithPassword(account.username, account.password, (error) => {
                                if(error) {
                                    this._notificationError(error);
                                    return;
                                }
                                else {
                                    FlowRouter.go('App');
                                }
                            })
                        }
                    })
                }
            });
        });
    }

    render() {
        return(
            <div className="login-box margin-top-1">
            <NotificationSystem ref="notification" className="notification" />
            <header>CREATE NEW ACCOUNT</header>
                    <RegisterStepper 
                        ref="RegisterStepper"
                        step={this.state.stepIndex}
                        handleNewAccount={this._handleNewAccount.bind(this)}
                        handleGroup={this._handleGroup.bind(this)}
                        handleSummary={this._handleSummary.bind(this)}
                        groupsList={this.props.groups}
                    />
                    <RegisterBtnBar />
            </div>
        );
    }

}

export default RegisterBox;