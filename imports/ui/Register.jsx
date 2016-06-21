import React from 'react';
import {Random} from 'meteor/random';
import {createContainer}  from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

import NotificationSystem from 'react-notification-system';

import '/imports/api/users.js';
import {Groups} from '/imports/api/groups.js';


export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            showPassword: false,
            account: {profile: {}},
            checkedGroup: '',
            checked: false,
        }

        this._notificationSuccess = this._notificationSuccess.bind(this);
        this._notificationError = this._notificationError.bind(this);
    }

    componentDidMount() {
        this._notification = this.refs.notification;
    }

    _notificationSuccess(message) {
        this._notification.addNotification({
            message: message,
            level: 'success',
            position: 'tr',
        });
    }

    _notificationError(message) {
        this._notification.addNotification({
            message: message,
            level: 'error',
            position: 'tr',
        });
    }

    _nextStep() {
        this.setState({
            stepIndex: this.state.stepIndex + 1,
            finished: this.state.stepIndex >= 2,  
        });
    }

    _prevStep() {
        if(this.state.stepIndex > 0)
            this.setState({
                stepIndex: this.state.stepIndex - 1,    
            });
    }

    _showPassword() {
        this.setState({
            showPassword: !this.state.showPassword,  
        });
    }

    _checkGroup(e, iic) {
        const checkBox = e.target;
        this.setState({
            checkedId: checkBox.value,
            checkedGroup: checkBox.checked ? checkBox.name : '',
            checked: checkBox.checked ? true : false, 
        });
    }

    _onEnterGroup() {
        const groupInput = this.refs.group.getValue();

        this.setState({
            checkedGroup: groupInput || '',
            checked: false, 
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

    _handleStep1() {
        // ?
        //const {username, password, email, phone} = this.refs;
        const username = this.refs.username.getValue();
        const password = this.refs.password.getValue();
        const email = this.refs.email.getValue();
        const phone = this.refs.phone.getValue();
        const avatar = this.refs.avatar.getValue();


        if(!username || !password || !email || !phone) {
            alert('You must fill the required fields.');
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

        Meteor.call('user.exists', username, (error, result) => {
            if(error) {
                this._notificationError(error);
                return;
            }

            if(result === true) {
                this._notificationError('Username ' + username + ' already exists.');
            }
            else {
                this.setState({
                    account: {
                                username: username,
                                password: password,
                                email: email,
                                profile: {
                                            phone: phone,
                                            avatar: avatar || `https://api.adorable.io/avatars/128/${email}.png`,
                                            group: '',
                                         },
                             },  
                });
                this._nextStep();
            }
        });
    }

    _handleStep2() {
        if(!this.state.checkedGroup) {
            this._notificationError('You must select group.');
            return;
        }

        this.state.account.profile.group = this.state.checkedGroup,

        this._nextStep();
    }

    _handleRegister(e) {
        e.preventDefault();

        const userId = Random.id();

        Meteor.call('groups.exists', this.state.checkedGroup, (error, result) => {
            if(error) {
                this._notificationError(error);
                return;
            }

            if(!result) {
                Meteor.call('groups.create', this.state.checkedGroup, userId);
                this._notificationSuccess('Grupa ' + this.state.checkedGroup + ' zostala utworzona.');
            }
            
            Meteor.call('groups.getId', this.state.checkedGroup, (err, data) => {
                if(data) {
                    this.state.account.profile.group = data;

                    Accounts.createUser(this.state.account, (error) => {
                        if(error) {
                            this._notificationError(error);
                            return;
                        }
                        else {
                            this._notificationSuccess('Your account has been created.');

                            Meteor.loginWithPassword(this.state.account.username, this.state.account.password, (error) => {
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
        const {finished, stepIndex} = this.state;
        return(
            <div className="login-box margin-top-1">
            <NotificationSystem ref="notification" className="notification" />
            <header>CREATE NEW ACCOUNT</header>
                    <Stepper activeStep={stepIndex} orientation="vertical">
                        <Step>
                            <StepLabel>Fill the register form</StepLabel>
                            <StepContent>
                                <div className="login-fields">
                                    <TextField
                                        floatingLabelText="Username"
                                        fullWidth={true}
                                        ref="username"
                                        defaultValue={this.state.account.username}
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
                                        defaultValue={this.state.account.email}
                                    />

                                    <TextField
                                        floatingLabelText="Phone number"
                                        fullWidth={true}
                                        ref="phone"
                                        defaultValue={this.state.account.profile.phone}
                                    />
                                    
                                    <TextField
                                        floatingLabelText="Avatar URL (optional)"
                                        fullWidth={true}
                                        ref="avatar"
                                        defaultValue={this.state.account.profile.avatar}
                                    />

                                </div>

                                <div className="login-btn-bar">
                                    <RaisedButton
                                        label='Next'
                                        disableTouchRipple={true}
                                        disableFocusRipple={true}
                                        primary={true}
                                        onTouchTap={this._handleStep1.bind(this)}
                                        className="login-btn"
                                    />
                                </div> 
                            </StepContent>
                        </Step>

                        <Step>
                            <StepLabel>Find group</StepLabel>
                            <StepContent>
                                <Subheader>Choose one from below:</Subheader>
                                <List>
                                    {this.props.groups.map((value, key) => (
                                        <ListItem
                                          leftCheckbox={
                                                        <Checkbox
                                                            value={value._id}
                                                            name={value.name} 
                                                            onCheck={this._checkGroup.bind(this)}
                                                            checked={value.name === this.state.checkedGroup}
                                                        />
                                                       }
                                          key={key}
                                          primaryText={value.name}
                                        />
                                    ))}
                                </List>

                                <Subheader>or create your own:</Subheader>
                                <TextField
                                    className="register-group-field"
                                    floatingLabelText="Group name"
                                    fullWidth={true}
                                    ref="group"
                                    value={this.state.checked ? '' : this.state.checkedGroup}
                                    onChange={this._onEnterGroup.bind(this)}
                                />
           
                                <div className="login-btn-bar">
                                    <RaisedButton
                                        label='Next'
                                        disableTouchRipple={true}
                                        disableFocusRipple={true}
                                        primary={true}
                                        className="login-btn"
                                        onTouchTap={this._handleStep2.bind(this)}
                                    />

                                {this.state.stepIndex > 0 && (
                                    <FlatButton
                                        label="Back"
                                        disabled={stepIndex === 0}
                                        disableTouchRipple={true}
                                        disableFocusRipple={true}
                                        onTouchTap={this._prevStep.bind(this)}
                                    />
                                )}
                                </div>
                            </StepContent>
                        </Step>

                        <Step>
                            <StepLabel>Have fun</StepLabel>
                            <StepContent>
                            <p>If you'll have any troubles, please contact with me at abc@dot.dot, good luck ;)</p>

                            <div className="login-btn-bar">
                                <RaisedButton
                                    label='Finish'
                                    disableTouchRipple={true}
                                    disableFocusRipple={true}
                                    primary={true}
                                    onTouchTap={this._handleRegister.bind(this)}
                                    className="login-btn"
                                />
                            </div>   
                            </StepContent>
                        </Step>
                    </Stepper>

                    <div className="login-btn-bar-center">
                        <a href="/login">Click here if you already have account</a>
                    </div>
            </div>
        );
    }

}

export default createContainer(() => {
  return{
    groups: Groups.find({}).fetch(),
  };
}, Register);