import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

Meteor.methods({
	'user.exists'(username) {
		check(username, String);

		if(Meteor.users.findOne({username: username}))
			return true;
		else
			return false;
	},

	'user.getById'(userId) {
		check(userId, String);
		return Meteor.users.findOne({_id: userId});
	}
});