import { composeWithTracker } from 'react-komposer';

import Hello from '../components/Hello';


const composer = ( props, onData ) => {
    let user = Meteor.user();
    let username;
    if(user === null) {
        username = 'nieznajomy';
    } else {
        username = user.username;
    }

    onData(null, {username} );
};

export const HomeContainer = composeWithTracker( composer )( Hello );