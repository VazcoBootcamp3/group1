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

            beforeEach(() => {
                Meteor.users.remove({});
                Accounts.createUser({username: user1_name});
                Accounts.createUser({username: user2_name});

                ShoppingList.remove({});
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
                // TODO
            });
        })
    });
}