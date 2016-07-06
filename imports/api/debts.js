import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {Debts} from '/imports/api/Collections/debts.js';

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
	},


	'debts.balance'(userId) {
		check(userId, String);

		let shouldPay = Debts.aggregate([
							{$match: {debtor: userId}},
							{$group: {
										_id: '$creditor',
										'debt': {'$sum': '$cost'}
									 }
						}]);

		let shouldGain = Debts.aggregate([
							{$match: {creditor: userId}},
							{$group: {
										_id: '$debtor',
										'debt': {'$sum': '$cost'}
									 }
							}
						]);

		let a = true;
		shouldPay.map((valueB, keyB) => {
			shouldGain.map(valueA => {
		  	if(valueA._id === valueB._id) {
		    	valueA.debt -= valueB.debt;
				delete shouldPay[keyB];
				a = false;
			}
			});
			
			if(a) {
				valueB.debt = -valueB.debt;
				shouldGain.push(valueB);
			}

			a = true;
		});

		return shouldGain.filter(n => true);
	}
});

