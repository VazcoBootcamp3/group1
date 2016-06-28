import React from 'react';

// material-ui
import {Step,Stepper,StepLabel,StepContent} from 'material-ui/Stepper';

// steps
import RegisterNewAccountFields from '/imports/ui/Register/RegisterNewAccountFields';
import RegisterGroup from '/imports/ui/Register/RegisterGroup';
import RegisterSummary from '/imports/ui/Register/RegisterSummary';
import RegisterStepperButtons from '/imports/ui/Register/RegisterStepperButtons'


class RegisterStepper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			stepIndex: 0,
			finished: false,
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

	render() {
		const {stepIndex} = this.state;

		return(
			<Stepper activeStep={stepIndex} orientation="vertical">
				<Step>
                    <StepLabel>Fill the register form</StepLabel>
                    <StepContent>
                        <RegisterNewAccountFields 
                        	ref="RegisterNewAccountFields"
                    	/>
                    	<RegisterStepperButtons 
	                    	step={stepIndex}
	                    	handlePrev={this._prevStep.bind(this)}
	                    	handleNext={() => {this.props.handleNewAccount()}}
                    	/>
                    </StepContent>
                </Step>

				<Step>
					<StepLabel>Find the group</StepLabel>
					<StepContent>
						<RegisterGroup 
							ref="RegisterGroup"
							groupsList={this.props.groupsList}
						/>
                    	<RegisterStepperButtons 
	                    	step={stepIndex}
	                    	handlePrev={this._prevStep.bind(this)}
	                    	handleNext={() => {this.props.handleGroup() && this._nextStep()}}
                    	/>						
					</StepContent>
				</Step>

				<Step>
					<StepLabel>Summary</StepLabel>
					<StepContent>
						<RegisterSummary />
                    	<RegisterStepperButtons 
	                    	step={stepIndex}
	                    	handlePrev={this._prevStep.bind(this)}
	                    	handleNext={() => {this.props.handleSummary()}}
                    	/>
					</StepContent>
				</Step>
			</Stepper>
		);
	}
}

export default RegisterStepper;