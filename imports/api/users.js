import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

Meteor.methods({
	'user.exists'(username, email) {
		check(username, String);
		check(email, String);

		if(Meteor.users.findOne(
			{$or: [
				{'username': username}, 
				{'emails.address': email}
			]}
		))
			return true;
		else
			return false;
	},

	'user.getById'(userId) {
		check(userId, String);
		return Meteor.users.findOne({_id: userId});
	}
});