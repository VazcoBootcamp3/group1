import {Meteor} from 'meteor/meteor';

import GroupList from '../imports/groups';

Meteor.publish('group-list', function () {
    let currentUser = this.userId;
    return GroupList.find({ users: {
        $elemMatch: { $eq: currentUser }
    }}, { fields: {
        name: 1
    }});
});