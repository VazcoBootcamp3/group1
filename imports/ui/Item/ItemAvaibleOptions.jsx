import React from 'react';
import {Meteor} from 'meteor/meteor';

// material-ui
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import {red100, green100} from 'material-ui/styles/colors';

// props
// creditor -> creditor id
// debt
// handleSettle -> event for btn settle
// handleDelete -> event for btn delete

const ItemAvaibleOptions = (props) => {

	const btnDelete = () => {
		if(Meteor.userId() === props.creditor)
			return(
		       	<RaisedButton
			      label="DELETE"
			      backgroundColor={red100}
			      icon={<FontIcon className="material-icons">delete</FontIcon>}
			      className="item-btn"
			      onTouchTap={props.handleDelete}
			    />
		    );
	};

	const btnSettle = () => {
		if(Meteor.userId() !== props.creditor && props.debt > 0) {
			return(
				<RaisedButton
			      label="SETTLE"
			      backgroundColor={green100}
			      icon={<FontIcon className="material-icons">account_balance_wallet</FontIcon>}
			      className="item-btn"
			      onTouchTap={props.handleSettle}
			    />	
	    	);
		}
	};

	return(
		<div className="item-box">
			<Subheader>Avaible options:</Subheader>
	  		{btnSettle()}
	  		{btnDelete()}
	  	</div>
  	);
};

export default ItemAvaibleOptions;