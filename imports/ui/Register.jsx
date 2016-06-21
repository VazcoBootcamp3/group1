import React from 'react';
import {Random} from 'meteor/random';


import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

import '/imports/api/users.js';


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            showPassword: false,
            account: {},
        }

        this._renderStepActions = this._renderStepActions.bind(this);
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

    _gotoStep(step) {
        this.setState({
            stepIndex: step,
            finished: false,
        });
    }

    _renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
            <div className="login-btn-bar">
                <RaisedButton
                    label='Next'
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this._nextStep.bind(this)}
                    className="login-btn"
                />

            {step > 0 && (
                <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    onTouchTap={this._prevStep.bind(this)}
                />
            )}
            </div>
        );
    }


    _showPassword() {
        this.setState({
            showPassword: !this.state.showPassword,  
        });
    }

    _handleStep1() {
        // ?
        //const {username, password, email, phone} = this.refs;
        const username = this.refs.username.getValue();
        const password = this.refs.password.getValue();
        const email = this.refs.email.getValue();
        const phone = this.refs.phone.getValue();

        if(!username || !password || !email || !phone) {
            alert('You must fill the required fields.');
            return;
        }

        Meteor.call('user.exists', username, (error, result) => {
            if(error) {
                console.log(error);
                return;
            }

            if(result === true) {
                alert('Username ' + username + ' already exists.');
            }
            else {
                this.setState({
                    account: {
                                username: username,
                                password: password,
                                email: email,
                                phone: phone,
                             },  
                });
                this._nextStep();
            }
        });
        

    }

    _handleRegister(e) {
        e.preventDefault();
/*
        const username = this.refs.username.getValue();
        const password = this.refs.password.getValue();
        const email = this.refs.email.getValue();
        const phone = this.refs.phone.getValue();

        if(!username || !password || !email || !phone) {
            alert("ERROR");
            return;
        }
*/
        const groupName = this.refs.group;
        console.log(groupName);

        if(!groupName) {
            alert("GROUP ERROR");
            return;
        }

        let userId = Random.id();

        console.log('meteor.call ...' + userId);

        Meteor.call('groups.create', groupName, userId, (error, result) => {
            if(error) console.log(error);
            if(result) console.log(result);
        });



    }

    render() {
        const {finished, stepIndex} = this.state;
        return(
            <div className="login-box margin-top-1">
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
                                        defaultValue={this.state.account.phone}
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
                            <StepLabel>Find group or create your own</StepLabel>
                            <StepContent>
                                <Subheader>Choose one from below:</Subheader>
                                <List>
                                    <ListItem
                                      leftCheckbox={<Checkbox />}
                                      primaryText="Notifications"
                                      secondaryText="Allow notifications"
                                    />
                                    <ListItem
                                      leftCheckbox={<Checkbox />}
                                      primaryText="Sounds"
                                      secondaryText="Hangouts message"
                                    />
                                    <ListItem
                                      leftCheckbox={<Checkbox />}
                                      primaryText="Video sounds"
                                      secondaryText="Hangouts video call"
                                    />
                                </List>

                                <Subheader>or create your own:</Subheader>
                                <TextField
                                    className="register-group-field"
                                    floatingLabelText="Group name"
                                    fullWidth={true}
                                    ref="group"
                                />
           
                            {this._renderStepActions(1)}
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