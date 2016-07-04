import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Random } from 'meteor/random';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import './Report';
import ShoppingList from '/imports/shoppings';

if( Meteor.isServer ) {
    describe('Report', () => {

        const u1_name = 'Stefan';
        const u2_name = 'Andrzej';

        beforeEach(() => {
            Meteor.users.remove({});
            ShoppingList.remove({});

            Accounts.createUser({username: u1_name});
            Accounts.createUser({username: u2_name});
        });

        describe('methods', () => {
            it('should throw error if user is not logged in', () => {
                const settleDebt = Meteor.server.method_handlers['report.settle'];
                const secondUserId = Meteor.users.findOne({username: u2_name})._id;
                const secondUsername = { secondUserId: secondUserId, };

                const stub = sinon.stub(Meteor, 'userId').returns(null);
                assert.throws(() => {
                    settleDebt.apply(this, [ secondUsername ])
                }, Error, 'report.settle.notLoggedIn');
                stub.restore();
            });

            it('should throw error if second user does not exists', () => {
                const settleDebt = Meteor.server.method_handlers['report.settle'];

                const userId = Random.id();
                const secondUsername = { secondUserId: null, };

                const stub = sinon.stub(Meteor, 'userId').returns(userId);
                assert.throws(() => {
                    settleDebt.apply(this, [ secondUsername ])
                }, Error, 'validation-error');
                stub.restore();
            });

            it('can change status of payment (single doc)', () => {
                const user1 = Meteor.users.findOne({username: u1_name});
                const user2 = Meteor.users.findOne({username: u2_name});

                ShoppingList.insert({
                    buyer: user1._id,
                    buyerName: user1.username,
                    indebted: user2._id,
                    indebtedName: user2.username,
                    price: 10,
                    products: 'products...',
                    paid: false,
                });

                assert.equal(ShoppingList.find({}).count(), 1);

                const settleDebt = Meteor.server.method_handlers['report.settle'];

                const firstUserId = user1._id;
                const secondUsername = { secondUserId: user2._id, };

                const stub = sinon.stub(Meteor, 'userId').returns(firstUserId);

                settleDebt.apply(this, [ secondUsername ]);

                const shopping = ShoppingList.findOne();

                assert.equal(shopping.paid, true);

                stub.restore();
            });

            it('can change status of payment (multiple docs)', () => {
                const user1 = Meteor.users.findOne({username: u1_name});
                const user2 = Meteor.users.findOne({username: u2_name});

                ShoppingList.insert({
                    buyer: user1._id,
                    buyerName: user1.username,
                    indebted: user2._id,
                    indebtedName: user2.username,
                    price: 10,
                    products: 'products...',
                    paid: false,
                });
                ShoppingList.insert({
                    buyer: user2._id,
                    buyerName: user2.username,
                    indebted: user1._id,
                    indebtedName: user1.username,
                    price: 12.96,
                    products: 'products...',
                    paid: false,
                });
                ShoppingList.insert({
                    buyer: user1._id,
                    buyerName: user1.username,
                    indebted: user2._id,
                    indebtedName: user2.username,
                    price: 76,
                    products: 'products...',
                    paid: false,
                });

                assert.equal(ShoppingList.find({}).count(), 3);

                const settleDebt = Meteor.server.method_handlers['report.settle'];

                const firstUserId = user1._id;
                const secondUsername = { secondUserId: user2._id, };

                const stub = sinon.stub(Meteor, 'userId').returns(firstUserId);

                settleDebt.apply(this, [ secondUsername ]);

                const shoppings = ShoppingList.find({}, { fields: { paid: 1 } });

                shoppings.forEach( (doc) => {
                   assert.equal(doc.paid, true);
                });

                stub.restore();
            });
        });
    });
}