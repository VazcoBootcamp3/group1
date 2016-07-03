import {composeWithTracker} from 'react-komposer';
import ItemBox from '/imports/ui/Item/ItemBox';
import LoadingComponent from '/imports/ui/LoadingComponent';

import {Debts} from '/imports/api/Collections/debts.js';


// props
// props.item - item

const composer = (props, onData) => {
	const item = props.item;

	if(Meteor.subscribe('users').ready() &&
	   Meteor.subscribe('debts').ready())
	{	
		const owner = Meteor.users.findOne({_id: item.creditor});
		const debts = Debts.find({item: item._id}).fetch();
		
		const shareWith = [];
		const stillGuilty = [];
		let youShouldPay = 0;

		debts.map((value, key) => {
			const user = Meteor.users.findOne({_id: value.debtor});

			if(value.debtor === Meteor.userId())
				youShouldPay = value.cost;

			if(value.cost > 0)
				stillGuilty.push(user);
			
			shareWith.push(user);
		});

		onData(null, {item, owner, shareWith, stillGuilty, youShouldPay});
	}
};

export const ItemContainer = composeWithTracker(composer, null)(ItemBox);