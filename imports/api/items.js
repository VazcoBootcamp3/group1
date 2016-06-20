import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

import {Debts}      from '/imports/api/debts.js';


export const Items = new Mongo.Collection('items');

Meteor.methods({

	'items.delete'(itemId) {
		check(itemId, String);

		if(!this.userId) {
			throw new Meteor.Error('non-authorized');
		}

		Debts.remove({item: itemId});
		Items.remove(itemId);
	},

});