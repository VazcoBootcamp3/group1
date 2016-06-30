import React from 'react/react';

const NavMenu = ( props ) => {
    if( props.isLoggedIn ) {
        return (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href={FlowRouter.path('Home')}>Home</a></li>
                <li><a href={FlowRouter.path('Checkout')}>Dodaj zakupy</a></li>
                <li><a href={FlowRouter.path('Report')}>Raport</a></li>
                <li><a href={FlowRouter.path('Group')}>Grupy</a></li>
                <li><a onClick={props.functions.logout} href="#">Wyloguj</a></li>
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