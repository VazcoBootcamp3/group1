import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from '../node_modules/react-komposer/index';

import Login from '../components/Login';
import Register from '../components/Register';
import NavMenu from '../components/NavMenu';

const composer = ( props, onData ) => {
    let isLoggedIn = false;
    if(Meteor.user() === null) {
        isLoggedIn = false;
    } else {
        isLoggedIn = true;
    }

    onData(null, {isLoggedIn} );
};

export const LoginContainer = composeWithTracker( composer )( Login );
export const RegisterContainer = composeWithTracker( composer )( Register );
export const NavMenuContainer = composeWithTracker( composer )( NavMenu );