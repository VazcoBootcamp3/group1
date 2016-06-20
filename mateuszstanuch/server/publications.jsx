import {Meteor} from 'meteor/meteor';

import GroupList from '../imports/groups';
import ShoppingList from '../imports/shoppings';

Meteor.publish('group-list', function () {
    let currentUser = this.userId;
    return GroupList.find({ users: {
        $elemMatch: { $eq: currentUser }
    }}, { fields: {
        name: 1
    }});
});

Meteor.publish('shopping-summary', function () {
    let currentUser = this.userId;
    return ShoppingList.find({ $or:
        [
            {buyer: { $eq: currentUser }},
            {indebted: { $eq: currentUser }}
        ]
    });
});

Meteor.publish('users', function (userId) {
    return Meteor.users.findOne( {_id: { $eq: userId }}, {fields: { name: 1 }} );
});