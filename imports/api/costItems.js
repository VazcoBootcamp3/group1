
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import App from '../ui/App.jsx';

const CostItems = new Mongo.Collection('costItems');

Meteor.methods({
  'costItems.insert'(productsList, moneyOwned, debtor) {
    check(productsList, String);
    check(moneyOwned, Number);
    check(debtor, String);

    var date = new Date();
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var formatedDate = day + "/" + month + "/" + year;
    if (debtor === 'all') {
      const loggedUser =  Meteor.user();
      const loggedUserGroup = loggedUser.profile.group;
      const userInGroupCount = Meteor.users.find({"profile.group": loggedUserGroup}).count();
      let filteredUsers = Meteor.users.find({}).fetch();
      filteredUsers = filteredUsers.filter(user => user.profile.group === loggedUserGroup && user._id !== loggedUser._id);
      moneyOwned = parseFloat((moneyOwned / userInGroupCount).toFixed(2));
      for (var user in filteredUsers) {
        CostItems.insert({
          productsList,
          moneyOwned,
          contractor: Meteor.user().username,
          group: Meteor.user().profile.group,
          debtor: filteredUsers[user].username,
          isPayed: false,
          createdAt: formatedDate,
        });
      }
    }
    else {
      CostItems.insert({
        productsList,
        moneyOwned,
        contractor: Meteor.user().username,
        group: Meteor.user().profile.group,
        debtor,
        isPayed: false,
        createdAt: formatedDate,
      });
    }
  },
  'costItems.setPayed'(itemId, setPayed) {
    check(itemId, String);
    check(setPayed, Boolean);
    CostItems.update(itemId, { $set: { isPayed: setPayed } });
  },
});

export default CostItems
