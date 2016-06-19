import {Meteor} from 'meteor/meteor';

import GroupList from '../imports/groups';

Meteor.publish('group-list', () => {
    //let currentUser = this.userId;
    let currentUser = 'zMHMQfbEWKMne8vzN';
    return GroupList.find({ users: {
        $elemMatch: { $eq: currentUser }
    }}, { fields: {
        name: 1
    }});
});