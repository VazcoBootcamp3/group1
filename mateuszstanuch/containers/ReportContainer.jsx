import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import ShoppingList from '../imports/shoppings';
import Report from '../components/Report';

const composer = ( props, onData ) => {
    if( Meteor.subscribe('shopping-summary').ready() ) {
        const shoppings = ShoppingList.find({}).fetch();
        onData(null, {shoppings});
    }
};

export const ReportContainer = composeWithTracker( composer )( Report );