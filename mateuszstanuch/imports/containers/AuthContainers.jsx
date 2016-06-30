import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { login, register, logout } from '/imports/methods/AuthMethods';

import Login from '/imports/components/Login';
import Register from '/imports/components/Register';
import NavMenu from '/imports/components/NavMenu';

const composer = ( props, onData ) => {
    let isLoggedIn = false;
    if(Meteor.user() === null) {
        isLoggedIn = false;
    } else {
        isLoggedIn = true;
    }

    onData(null, {isLoggedIn, functions: {
        login: login,
        register: register,
        logout: logout,
    }} );
};

export const LoginContainer = composeWithTracker( composer )( Login );
export const RegisterContainer = composeWithTracker( composer )( Register );
export const NavMenuContainer = composeWithTracker( composer )( NavMenu );