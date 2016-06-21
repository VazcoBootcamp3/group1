import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Groups = new Mongo.Collection('groups');

Meteor.methods({
	'groups.create'(name, creator) {
		check(name, String);

		if(!this.userId) {
			throw new Meteor.Error('non-authorized');
		}

		Groups.insert({
			name: name,
            creator: creator,
            createdAt: new Date(),
        });
	},

	'groups.exists'(name) {
		check(name, String);

		if(Groups.findOne({name: name}))
			return true;
		else
			return false;
	},

});