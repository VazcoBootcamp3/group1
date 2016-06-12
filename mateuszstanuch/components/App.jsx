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
                            <li><a href="/">Home</a></li>
                            <li><a href="/checkout">Dodaj zakupy</a></li>
                            <li><a href="/report">Raport</a></li>
                            <li><a href="/login">Logowanie</a></li>
                            <li><a href="/register">Rejestracja</a></li>
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