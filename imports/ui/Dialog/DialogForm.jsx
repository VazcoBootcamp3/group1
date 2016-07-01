import React from 'react';

import DialogShareWith from '/imports/ui/Dialog/DialogShareWith';

// material-ui
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

// props
// users -> array of users

class DialogForm extends React.Component {
	render() {
		return(
			<div>
			    <TextField
			        floatingLabelText="Products list"
			        multiLine={true}
			        rows={2}
			        fullWidth={true}
			        ref="productsInput"
			    />
			    <DatePicker
			        hintText="Date"
			        container="inline"
			        mode="landscape"
			        fullWidth={true}
			        ref="dateInput"
			    />
			    <TextField
			        hintText="Total cost"
			        fullWidth={true}
			        type="number"
			        ref="totalCostInput"
			    />
			    <DialogShareWith
			    	ref="DialogShareWith"
			    	users={this.props.users}
			    />
		    </div>
		);
	}
}

export default DialogForm;