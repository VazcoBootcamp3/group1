import { composeWithTracker } from 'react-komposer';

import Hello from '/imports/components/Hello';


const composer = ( props, onData ) => {
    let username;
    if(Meteor.user() && Meteor.user().username) {
        username = Meteor.user().username;
    } else {
        username = 'nieznajomy';
    }

    onData(null, {username} );
};

export const HomeContainer = composeWithTracker( composer )( Hello );