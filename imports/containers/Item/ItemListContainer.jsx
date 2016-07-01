import {composeWithTracker} from 'react-komposer';
import LoadingComponent from '/imports/ui/LoadingComponent';

import ItemList from '/imports/ui/Item/ItemList';
import {Items} from '/imports/api/items.js';


const composer = (props, onData) => {
	if(Meteor.subscribe('items').ready() &&
	   Meteor.subscribe('users').ready()) 
	{
		const items = Items.find({});
		const users = Meteor.users.find({});

		onData(null, {items, users});
	}
};

export const ItemListContainer = composeWithTracker(composer, LoadingComponent)(ItemList);