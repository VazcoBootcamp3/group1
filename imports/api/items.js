import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {Debts}      from '/imports/api/Collections/debts.js';
import {Items}		from '/imports/api/Collections/items.js';

Meteor.methods({
	'items.delete'(itemId) {
		check(itemId, String);

		if(!this.userId) {
			throw new Meteor.Error('non-authorized');
		}

		Debts.remove({item: itemId});
		Items.remove(itemId);
	},

	'items.add'(item) {
		check(item, Object);

		Items.insert(
		{
            creditor: Meteor.userId(),
            products: item.products,
            date: item.date,
            totalCost: item.totalCost,
            createdAt: new Date(),
        }, (error, result) => {
        	if(result) {
        		item.shareWith.map(value => {
		            Debts.insert({
		                creditor: Meteor.userId(),
		                debtor: value._id,
		                item: result,
		                cost: item.totalCost/(item.shareWith.length +1),
		                createdAt: new Date(),
		            });
        		});
        	}
        });
	}

});