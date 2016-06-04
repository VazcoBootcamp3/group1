
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Users = new Mongo.Collection('users');

Meteor.methods({
  'users.insert'(nick) {
    check(nick, String);

    Users.insert({
      nick,
      balance: 0.0,
      createdAt: new Date(),
    });
  },
  'users.remove'(userId) {

    check(userId, String);
    var userBalance = Users.findOne({_id: userId}).balance;
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
    Users.remove({_id: userId});
  },


  'users.updateBalance'(userId, balanceChange) {
    check(balanceChange, Number);
    var newBalance = Users.findOne({_id: userId}).balance + balanceChange;
    Users.update(userId, { $set: { balance: newBalance } });
  },
});
