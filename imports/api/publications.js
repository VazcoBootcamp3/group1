import {Meteor} from 'meteor/meteor';
import {Items} from '/imports/api/Collections/items.js';
import {Debts} from '/imports/api/Collections/debts.js';

Meteor.publish('users', () => {
	return Meteor.users.find({}, {fields: {username: true, profile: true}});
});

Meteor.publish('items', () => {
	return Items.find({}, {fields: {createdAt: false}});
});

Meteor.publish('debts', () => {
	return Debts.find({});
})