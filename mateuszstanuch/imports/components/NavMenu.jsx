import {Meteor} from 'meteor/meteor';
import React from 'react/react';

function logout () {
    Meteor.logout(error => {
        if(error) {
            Materialize.toast(error.reason, 4000);
        } else {
            Materialize.toast("Pomyślnie wylogowano :)", 4000);
            FlowRouter.go('Home');
        }
    })
};

const NavMenu = ( props ) => {
    if( props.isLoggedIn ) {
        return (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href={FlowRouter.path('Home')}>Home</a></li>
                <li><a href={FlowRouter.path('Checkout')}>Dodaj zakupy</a></li>
                <li><a href={FlowRouter.path('Report')}>Raport</a></li>
                <li><a href={FlowRouter.path('Group')}>Grupy</a></li>
                <li><a onClick={logout} href="#">Wyloguj</a></li>
            </ul>
        );
    } else {
        return (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href={FlowRouter.path('Home')}>Home</a></li>
                <li><a href={FlowRouter.path('Login')}>Logowanie</a></li>
                <li><a href={FlowRouter.path('Register')}>Rejestracja</a></li>
            </ul>
        );
    }
}

export default NavMenu;