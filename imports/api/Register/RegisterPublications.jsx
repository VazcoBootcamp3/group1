import {Meteor} from 'meteor/meteor';
import {Groups} from '/imports/api/Collections/groups.js';

Meteor.publish('groups-list', () => {
	return Groups.find({});
});