
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import App from '../ui/App.jsx';
import { FlatMates } from '../api/users';

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

    CostItems.insert({
      productsList,
      moneyOwned,
      contractor: Meteor.user().username,
      group: Meteor.user().profile.group,
      debtor,
      isPayed: false,
      createdAt: formatedDate,
    });
  },
  'costItems.setPayed'(itemId, setPayed) {
    check(itemId, String);
    check(setPayed, Boolean);
    if (Meteor.user().username === this.contractor) {
      CostItems.update(itemId, { $set: { isPayed: setPayed } });
    }
    else {
      Materialize.toast("Tylko ten który zapłacił za zakupy może zaznaczyć task jako zapłacony :)", 4000);
    }
  },
});

export default CostItems
