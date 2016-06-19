import React from 'react/react';
import { NavMenuContainer } from '../containers/AuthContainers';

const AppLayout = ( props ) => {
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo">Domowe Rozliczenia</a>
                    <NavMenuContainer />
                </div>
            </nav>
            <div className="container">
                {props.content}
            </div>
        </div>
    );
};

export default AppLayout;