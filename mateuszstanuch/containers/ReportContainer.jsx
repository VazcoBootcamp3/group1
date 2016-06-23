import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import ShoppingList from '../imports/shoppings';
import Report from '../components/Report';


const getSummary = (shoppings) => {
    let shoppingsDict = {};
    let usernames = {};
    let currentUserId = Meteor.userId();

    for(let s of shoppings) {
        if( ! s.paid ) {
            if (s.buyer in shoppingsDict) {
                shoppingsDict[s.buyer] += s.price;
            } else {
                shoppingsDict[s.buyer] = s.price;
                usernames[s.buyer] = s.buyerName;
            }

            if (s.indebted in shoppingsDict) {
                shoppingsDict[s.indebted] -= s.price;
            } else {
                shoppingsDict[s.indebted] = -s.price;
                usernames[s.indebted] = s.indebtedName;
            }
        }
    }

    let shoppingsSummary = [];
    for(let key in shoppingsDict) {
        if( key === currentUserId ) continue;

        shoppingsSummary.push({
            id: key,
            name: usernames[key],
            balance: shoppingsDict[key],
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