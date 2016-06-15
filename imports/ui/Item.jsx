import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';

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

export default class Item extends Component {
	_deleteItem() {
		Items.remove(this.props.item._id);
	}


	_btnSettle() {
		return(
		<RaisedButton
	      label="SETTLE"
	      backgroundColor={green100}
	      icon={<FontIcon className="material-icons">account_balance_wallet</FontIcon>}
	      className="item-btn"
	    />	
	    );
	}

	_btnDelete() {
		if(Meteor.userId() === this.props.item.debtor) 
			return(
		       	<RaisedButton
			      label="DELETE"
			      backgroundColor={red100}
			      icon={<FontIcon className="material-icons">delete</FontIcon>}
			      className="item-btn"
			      onTouchTap={this._deleteItem.bind(this)}
			    />		
		    );
	}

	render() {
		return (
			<Card>
			    <CardHeader
			      title={<span className="item-title">{this.props.item.username}</span>}
			      subtitle={
			      	<span>has spent {this.props.item.totalCost} zł on {this.props.item.date ? this.props.item.date.toDateString() : ''}</span>
			      }
			      avatar="http://www.mpcforum.pl/uploads/profile/photo-1435795.jpg?_r=1443620809"
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
					    	<p className="item-t item-cost item-your-cost">0.50 zł</p>
				    	</div>

			    		<div className="item-box">
			    			<Subheader>Options:</Subheader>
			          		<p className="item-t item-cost item-your-cost">{this._btnSettle()}</p>
			          	</div>
			    	</div>

			    	<div className="column-center">
			    		<div className="item-box">
			    			<Subheader>Shared with:</Subheader>
				    		<div className="item-t">
					    		<Avatar className="item-avatar" src="http://material-ui.com/images/uxceo-128.jpg" size={40} />
					    		<Avatar className="item-avatar" src="http://material-ui.com/images/uxceo-128.jpg" size={40} />
					    		<Avatar className="item-avatar" src="http://material-ui.com/images/uxceo-128.jpg" size={40} />
					    		<Avatar className="item-avatar" src="http://material-ui.com/images/uxceo-128.jpg" size={40} />
					    	</div>
				    	</div>

			    		<div className="item-box">
					    	<Subheader>Still guilty:</Subheader>
				    		<div className="item-t">
					    		<Avatar className="item-avatar" src="http://material-ui.com/images/uxceo-128.jpg" size={40} />
					    	</div>
				    	</div>
				    </div>
			    </CardText>

			    <CardActions expandable={true}>
		          	<div className="item-btn-panel">
			          {this._btnDelete()}
					</div>
			    </CardActions>
			  </Card>
		);
	}
}
