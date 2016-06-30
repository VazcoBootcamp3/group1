import React from 'react';
import {Meteor} from 'meteor/meteor';

// Item
import ItemProducts from '/imports/ui/Item/ItemProducts';
import ItemTotalCost from '/imports/ui/Item/ItemTotalCost';
import ItemAvatars from '/imports/ui/Item/ItemAvatars';
import ItemYouShouldPay from '/imports/ui/Item/ItemYouShouldPay';
import ItemAvaibleOptions from '/imports/ui/Item/ItemAvaibleOptions';
// ---

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class ItemBox extends React.Component {

	_settle() {
		Meteor.call('debts.settle', this.props.item._id);
	}

	_delete() {
		Meteor.call('items.delete', this.props.item._id);
	}

	render() {
		return (
			<Card>
			    <CardHeader
			      title={<span className="item-title">{this.props.owner.username}</span>}
			      subtitle={
			      	<span>has spent {this.props.item.totalCost} zł on {this.props.item.date ? this.props.item.date.toDateString() : ''}</span>
			      }
			      avatar={this.props.owner.profile.avatar}
			      actAsExpander={true}
			      showExpandableButton={true}
			    />
			    <CardText expandable={true}>
			    	<div className="column-left">
			    		<ItemProducts 
				    		products={this.props.item.products}
			    		/>

			    		<ItemTotalCost 
				    		totalCost={this.props.item.totalCost}
			    		/>
				    </div>
			    		
			    	<div className="column-right">
			    		<ItemYouShouldPay 
			    			creditor={this.props.item.creditor}
				    		cost={this.props.youShouldPay} 
				    	/>

			    		<ItemAvaibleOptions 
			    			creditor={this.props.item.creditor}
			    			debt={this.props.youShouldPay}
			    			handleSettle={this._settle.bind(this)}
			    			handleDelete={this._delete.bind(this)}
			    		/>
			    	</div>

			    	<div className="column-center">
			    		<ItemAvatars
			    			header="Shared with:"
				    		users={this.props.shareWith}
			    		/>

			    		<ItemAvatars
			    			header="Still guilty:"
			    			users={this.props.stillGuilty}
			    		/>
				    </div>
			    </CardText>
			  </Card>
		);
	}
}

export default ItemBox;