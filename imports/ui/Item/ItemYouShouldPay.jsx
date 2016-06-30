import React from 'react';
import {Meteor} from 'meteor/meteor';

// material-ui
import Subheader from 'material-ui/Subheader';

const ItemYouShouldPay = (props) => {
	return(
		<div className="item-box">
			<Subheader>You should pay:</Subheader>
			<p className="item-t item-cost item-your-cost">{props.cost.toFixed(2)} zł</p>
		</div>
	);
};

export default ItemYouShouldPay;