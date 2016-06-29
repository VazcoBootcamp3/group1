import React from 'react';

// material-ui
import Subheader from 'material-ui/Subheader';

const ItemTotalCost = (props) =>
	<div className="item-box">
		<Subheader>Total cost:</Subheader>
    	<p className="item-t item-cost item-total">{props.totalCost} zł</p>
	</div>;

export default ItemTotalCost;