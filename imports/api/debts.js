import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Debts = new Mongo.Collection('debts');

Meteor.methods({
	'debts.checkMyDebt'(itemId) {
		check(itemId, String);

		if(!this.userId) {
			throw new Meteor.Error('non-authorized');
		}

		return Debts.findOne(
			{
				debtor: Meteor.userId(),
				item: itemId,
			});
	},

	'debts.numberOfDebtors'(itemId) {
		check(itemId, String);

		if(!this.userId) {
			throw new Meteor.Error('non-authorized');
		}

		return Debts.find({item: itemId,}).count();
	},

	'debts.settle'(itemId) {
		check(itemId, String);

		if(!this.userId) {
			throw new Meteor.Error('non-authorized');
		}

		Debts.update(
			{item: itemId, debtor: this.userId},
			{$set: {cost: 0}},
		);
	}
});

