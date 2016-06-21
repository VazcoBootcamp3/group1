import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {createContainer}  from 'meteor/react-meteor-data';

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


	_btnSettle() {
		if(Meteor.userId() !== this.props.item.creditor && this._checkMyDebt() > 0) {
			return(
				<RaisedButton
			      label="SETTLE"
			      backgroundColor={green100}
			      icon={<FontIcon className="material-icons">account_balance_wallet</FontIcon>}
			      className="item-btn"
			      onTouchTap={this._settle.bind(this)}
			    />	
	    	);
		}
	}

	_btnDelete() {
		if(Meteor.userId() === this.props.item.creditor) {
			return(
		       	<RaisedButton
			      label="DELETE"
			      backgroundColor={red100}
			      icon={<FontIcon className="material-icons">delete</FontIcon>}
			      className="item-btn"
			      onTouchTap={this._delete.bind(this)}
			    />		
		    );
		}
	}

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
		let debt = Debts.findOne(
			{
				item: this.props.item._id,
				debtor: Meteor.userId(),
			});
		return debt ? debt.cost : 0;
	}

	_renderShareWith() {
		return this.props.debts.map((value, key) => {
			return(
				<Avatar
					key={key} 
					className="item-avatar" 
					size={40}
	          		color={indigo900}
	          		backgroundColor={blue300}>
				{this.getUsername(value.debtor)[0]}
				</Avatar>
			);
		});
	}

	_renderStillGuilty() {
		return this.props.debts.map((value, key) => {
			if(value.cost > 0)
				return(
					<Avatar
						key={key} 
						className="item-avatar" 
						size={40}
		          		color={indigo900}
		          		backgroundColor={blue300}>
					{this.getUsername(value.debtor)[0]}
					</Avatar>
				);
		});	
	}

	_renderShouldPay() {
		if(Meteor.userId() === this.props.item.creditor)
			return 'nothing.';
		else {
			return this._checkMyDebt().toFixed(2) + ' zł';
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
			      avatar={Meteor.user().profile.avatar}
			      actAsExpander={true}
			      showExpandableButton={true}
			    />
			    <CardText expandable={true}>
			    	<div className="column-left">
			    		<div className="item-box">
				    		<Subheader>Products:</Subheader>
					    	<p className="item-t">{this.props.item.products}</p>
				    	</div>

			    		<div className="item-box">
				    		<Subheader>Total cost:</Subheader>
					    	<p className="item-t item-cost item-total">{this.props.item.totalCost} zł</p>
				    	</div>
				    </div>
			    		
			    	<div className="column-right">
			    		<div className="item-box">
			    			<Subheader>You should pay:</Subheader>
					    	<p className="item-t item-cost item-your-cost">{this._renderShouldPay()}</p>
				    	</div>

			    		<div className="item-box">
			    			<Subheader>Avaible options:</Subheader>
			          		{this._btnSettle()}
			          		{this._btnDelete()}
			          	</div>
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