import React, {PropTypes} from 'react';
import {createContainer}  from 'meteor/react-meteor-data';
import {Meteor}           from 'meteor/meteor';

import NewItemButton from '/imports/ui/NewItemButton';
import Item from '/imports/ui/Item';

import {Items}      from '/imports/api/items.js';


export class ShoppingList extends React.Component {
    _renderItems() {
    	return this.props.items.map((item) => (
    		<Item key={item._id} item={item} />
    	));
    }

    render() {
        return(
            <div>
                {this._renderItems()}
                <NewItemButton users={this.props.users} />
            </div>
        );
    }

}

ShoppingList.propTypes = {
    users: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
}

export default createContainer(() => {
  return{
    items: Items.find({}, { sort: { date: -1 } }).fetch(),
    users: Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch(),
  };
}, ShoppingList);