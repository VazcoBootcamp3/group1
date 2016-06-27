import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';

import './Checkout';

import ShoppingList from '/imports/shoppings';
import GroupList from '/imports/groups';

if( Meteor.isServer ) {
    describe('Checkout', () => {
        describe('methods', () => {
            const user1_name = 'user1';
            const user2_name = 'user2';
            const user3_name = 'user3';
            const groupName = 'test';

            beforeEach(() => {
                Meteor.users.remove({});
                // clear GroupList
                GroupList.remove({});
                // clear ShoppingList
                ShoppingList.remove({});

                // create users
                const u1 = Accounts.createUser({username: user1_name});
                const u2 = Accounts.createUser({username: user2_name});
                const u3 = Accounts.createUser({username: user3_name});
                // create group and add members
                const usersList = [ u1, u2, u3 ];

                const groupId = GroupList.insert({
                    name: groupName,
                    users: usersList
                });
                // add group to user
                for(const userId of usersList) {
                    Meteor.users.update({
                        _id: userId
                    }, {
                        $set: {
                            'services.groups': [ groupId ]
                        }
                    });
                }

            });

            it('can add new shopping', () => {
                const newShopping = Meteor.server.method_handlers['checkout.create'];

                const buyer = Meteor.users.findOne({username: user1_name});
                const indebted = Meteor.users.findOne({username: user2_name});
                const price = 123.45;
                const products = 'Products...'

                const shopping = {
                    buyer: buyer.username,
                    indebted: indebted.username,
                    products: products,
                    price: price,
                };

                newShopping.apply(this, [ shopping ]);

                // assertions...
                assert.equal(ShoppingList.find({}).count(), 1);

                const result = ShoppingList.findOne();
                assert.equal(result.buyer, buyer._id);
                assert.equal(result.buyerName, buyer.username);
                assert.equal(result.indebted, indebted._id);
                assert.equal(result.indebtedName, indebted.username);
                assert.equal(result.price, price);
                assert.equal(result.products, products);
            });

            it('can add new group shopping', () => {
                const newShopping = Meteor.server.method_handlers['checkout.create'];

                const buyer = Meteor.users.findOne({username: user3_name});
                const indebted = 'group/'+groupName;
                const price = 123.20;
                const products = 'Products...'

                const shopping = {
                    buyer: buyer.username,
                    indebted: indebted,
                    products: products,
                    price: price,
                };

                newShopping.apply(this, [ shopping ]);

                // assertions...
                assert.equal(ShoppingList.find({}).count(), 2);

                const result = ShoppingList.findOne({indebtedName: user2_name});

                assert.equal(result.buyer, buyer._id);
                assert.equal(result.buyerName, buyer.username);
                assert.equal(result.indebted, Meteor.users.findOne({username: user2_name})._id);
                assert.equal(result.indebtedName, user2_name);
                // in test group we have: user1, user2, user3 - 3 users
                let cost_per_member = price / 3;
                assert.equal(result.price, cost_per_member);
                assert.equal(result.products, products);
            });
        });
    });
}