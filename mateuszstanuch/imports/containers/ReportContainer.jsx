import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import ShoppingList from '/imports/shoppings';
import Report from '/imports/components/Report';


const getSummary = (shoppings) => {
    let shoppingsDict = {};
    let usernames = {};
    let currentUserId = Meteor.userId();

    for(let s of shoppings) {
        if( ! s.paid ) {
            if(s.buyer !== currentUserId) {
                // Somebody buys for current user
                // Current user owed money - minus
                if(s.buyer in shoppingsDict) {
                    shoppingsDict[s.buyer] -= s.price;
                } else {
                    shoppingsDict[s.buyer] = -s.price;
                    usernames[s.buyer] = s.buyerName;
                }
            }
            if(s.indebted !== currentUserId) {
                if(s.indebted in shoppingsDict) {
                    shoppingsDict[s.indebted] += s.price;
                } else {
                    shoppingsDict[s.indebted] = +s.price;
                    usernames[s.indebted] = s.indebtedName;
                }
            }
        }
    }

    let shoppingsSummary = [];
    for(let key in shoppingsDict) {
        const balance = shoppingsDict[key];
        if(balance === 0) continue;

        shoppingsSummary.push({
            id: key,
            name: usernames[key],
            balance: balance,
        });
    }

    return shoppingsSummary;
};

const composer = ( props, onData ) => {
    if( Meteor.subscribe('shopping-summary').ready() ) {
        const shoppingsData = ShoppingList.find({}).fetch();
        const shoppings = getSummary(shoppingsData);
        onData(null, {shoppings});
    }
};

export const ReportContainer = composeWithTracker( composer )( Report );