import {Meteor} from 'meteor/meteor';

import '/imports/api/groups.js';

Meteor.publish('groups-list', () => {
	return Groups.find({}, {'_id': true, 'name': true});
});