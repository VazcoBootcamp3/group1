import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { getSummary, settleDebt } from '/imports/methods/ReportMethods.jsx'

import ShoppingList from '/imports/shoppings';
import Report from '/imports/components/Report';

const functions = {
    settleDebt : settleDebt,
};

const composer = ( props, onData ) => {
    if( Meteor.subscribe('shopping-summary').ready() ) {
        const shoppingsData = ShoppingList.find({}).fetch();
        const shoppings = getSummary(shoppingsData);
        onData(null, {shoppings, functions});
    }
};

export const ReportContainer = composeWithTracker( composer )( Report );