import React from 'react';


import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';


export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finished: false,
            stepIndex: 0,
            showPassword: false,
        }
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

    _renderStepActions(step) {
        const {stepIndex} = this.state;

        return (
          <div className="login-btn-bar">
            <RaisedButton
              label={stepIndex === 2 ? 'Finish' : 'Next'}
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
                                    />

                                    <TextField
                                        floatingLabelText="Phone number"
                                        fullWidth={true}
                                    />
                                </div>
                                {this._renderStepActions(0)}
                            </StepContent>
                        </Step>

                        <Step>
                            <StepLabel>Find group or create your own</StepLabel>
                            <StepContent>
                            {this._renderStepActions(1)}
                            </StepContent>
                        </Step>

                        <Step>
                            <StepLabel>Have fun</StepLabel>
                            <StepContent>
                            <p>If you'll have any troubles, please contact with me at abc@dot.dot, good luck ;)</p>
                            {this._renderStepActions(2)}
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