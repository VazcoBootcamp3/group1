
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const FlatMates = new Mongo.Collection('flatmates');

Meteor.methods({
  'flatmates.insert'(nick) {
    check(nick, String);

    FlatMates.insert({
      nick,
      balance: 0.0,
      createdAt: new Date(),
    });
  },
  'flatmates.remove'(userId) {
    check(userId, String);

    var user = FlatMates.findOne({_id: userId});
    var userBalance = user && user.balance;
    if (userBalance > 0.0) {
      Materialize.toast("Usuwany użytkownik powinien otrzymać zwrot: " + userBalance + " PLN!", 10000);
    }
    else if (userBalance < 0.0) {
      userBalance *= -1;
      Materialize.toast("Usuwany użytkownik powinien otrzymać zwrot: " + userBalance + " PLN!", 10000);
    }
    else {
      Materialize.toast("Usuwany użytkownik nie posiada zadłużenia ani nie jest wierzycielem :)", 10000);
    }
    FlatMates.remove({_id: userId});
  },

  'flatmates.updateBalance'(userId, balanceChange) {
    check(balanceChange, Number);
    FlatMates.update(userId, { $inc: { balance: balanceChange } });
  },
});
