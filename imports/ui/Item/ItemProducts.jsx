import React from 'react';

// material-ui
import Subheader from 'material-ui/Subheader';

const ItemProducts = (props) =>
	<div className="item-box">
		<Subheader>Products:</Subheader>
    	<p className="item-t">{props.products}</p>
	</div>;

export default ItemProducts;