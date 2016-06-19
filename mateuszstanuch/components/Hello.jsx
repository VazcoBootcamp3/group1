import React from 'react/react';

const Hello = (props) => {
    return (
        <div>
            <h1>Cześć, {props.username}!</h1>
        </div>
    )
};

export default Hello;