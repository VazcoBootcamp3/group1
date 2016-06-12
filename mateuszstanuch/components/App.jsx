import React from 'react';

// TODO filter routes

export default class AppLayout extends React.Component {
    render () {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo">Domowe Rozliczenia</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href={FlowRouter.path('Home')}>Home</a></li>
                            <li><a href={FlowRouter.path('Checkout')}>Dodaj zakupy</a></li>
                            <li><a href={FlowRouter.path('Report')}>Raport</a></li>
                            <li><a href={FlowRouter.path('Login')}>Logowanie</a></li>
                            <li><a href={FlowRouter.path('Register')}>Rejestracja</a></li>
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    {this.props.content}
                </div>
            </div>
        );
    }
}