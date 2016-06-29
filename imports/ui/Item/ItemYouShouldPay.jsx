import React from 'react';

// material-ui
import Subheader from 'material-ui/Subheader';

const ItemYouShouldPay = (props) =>
	<div className="item-box">
		<Subheader>You should pay:</Subheader>
		<p className="item-t item-cost item-your-cost">{props.cost}</p>
	</div>;

export default ItemYouShouldPay;