import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer}  from 'meteor/react-meteor-data';
import {Session} from 'meteor/session'

// Item
import ItemHeader from '/imports/ui/Item/ItemHeader';
import ItemProducts from '/imports/ui/Item/ItemProducts';
import ItemTotalCost from '/imports/ui/Item/ItemTotalCost';
import ItemYouShouldPay from '/imports/ui/Item/ItemYouShouldPay';
import ItemAvaibleOptions from '/imports/ui/Item/ItemAvaibleOptions';
// ---

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import FontIcon from 'material-ui/FontIcon'
import {List, ListItem} from 'material-ui/List';
import {red100, green100} from 'material-ui/styles/colors';

import {Items} from '/imports/api/items.js';
import {Debts} from '/imports/api/debts.js';

import randomColor from 'random-color';

import {
blue300,
indigo900,
orange200,
deepOrange300,
pink400,
purple500,
} from 'material-ui/styles/colors';

export class Item extends Component {

	_settle() {
		Meteor.call('debts.settle', this.props.item._id);
	}

	_delete() {
		Meteor.call('items.delete', this.props.item._id);
	}

	// to remove
	//======================================================
	getUsername(id) {
		return Meteor.users.findOne({_id: id}).username;
	}

	_checkMyDebt() {
		Meteor.call('debts.checkMyDebt', this.props.item._id, (error, data) => {
			if(data) {
				console.log('------------');
				console.log(this.props.item._id);
				console.log(data);
			}
		})
	}

	_renderShareWith() {
		return this.props.debts.map((value, key) => {
				Meteor.call('user.getById', value.debtor, (error, data) => {
					Session.set('user', data);
				});

				return(
					<Avatar
						key={key} 
						className="item-avatar" 
						// src={Session.get('user').profile.avatar}
					/>
				);
		});	
	}

	_renderStillGuilty() {
		return this.props.debts.map((value, key) => {
			if(value.cost > 0)
				Meteor.call('user.getById', value.debtor, (error, data) => {
					Session.set('user', data);
				});

				return(
					<Avatar
						key={key} 
						className="item-avatar" 
						tooltip="tooltip"
						// src={Session.get('user').profile.avatar}
					/>
				);
		});	
	}

	_renderShouldPay() {
		if(Meteor.userId() === this.props.item.creditor)
			return 'nothing.';
		else {
			this._checkMyDebt();
		}
	}

	render() {
		return (
			<Card>
			    <CardHeader
			      title={<span className="item-title">{this.props.item.username}</span>}
			      subtitle={
			      	<span>has spent {this.props.item.totalCost} zł on {this.props.item.date ? this.props.item.date.toDateString() : ''}</span>
			      }
			      avatar='https://lh5.googleusercontent.com/-MlnvEdpKY2w/AAAAAAAAAAI/AAAAAAAAAFw/x6wHNLJmtQ0/s0-c-k-no-ns/photo.jpg'
			      actAsExpander={true}
			      showExpandableButton={true}
			    />
			    <CardText expandable={true}>
			    	<div className="column-left">
			    		<ItemProducts products={this.props.item.products} />
			    		<ItemTotalCost totalCost={this.props.item.totalCost} />
				    </div>
			    		
			    	<div className="column-right">
			    		<ItemYouShouldPay 
			    			creditor={this.props.item.creditor}
				    		cost={this._renderShouldPay()} 
				    	/>

			    		<ItemAvaibleOptions 
			    			creditor={this.props.item.creditor}
			    			debt='1'
			    			handleSettle={this._settle}
			    			handleDelete={this._delete}
			    		/>
			    	</div>

			    	<div className="column-center">
			    		<div className="item-box">
			    			<Subheader>Shared with:</Subheader>
				    		<div className="item-t">
								{this._renderShareWith()}
					    	</div>
				    	</div>

			    		<div className="item-box">
					    	<Subheader>Still guilty:</Subheader>
				    		<div className="item-t">
				    			{this._renderStillGuilty()}
					    	</div>
				    	</div>
				    </div>
			    </CardText>
			  </Card>
		);
	}
}

export default createContainer((props) => {
  return{
  	debts: Debts.find({item: props.item._id}).fetch(),
  };
}, Item);