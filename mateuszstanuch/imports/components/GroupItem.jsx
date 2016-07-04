import React from 'react/react';

export const GroupItem = (props) => {
    return (
        <li className="collection-item">
            <div>
                {props.groupname}
                <a href="#!" className="secondary-content"
                   onClick={() => { props.functions.leaveGroup(props.groupid) }}>
                    <i className="material-icons">clear</i>
                </a>
            </div>
        </li>
    );
};