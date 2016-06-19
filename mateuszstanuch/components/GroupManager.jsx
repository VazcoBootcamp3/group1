import React from 'react/react';

import GroupJoin from './GroupJoin';

const GroupItem = (props) => {
    return (
        <li className="collection-item">{props.groupname}</li>
    );
}

const GroupManager = (props) => {
    return (
        <div>
          <div className="row">
              <h4>Grupy do których należysz</h4>
              <ul className="collection">
                  {
                      (props.groups).map((group, key) => <GroupItem groupname={group.name} key={key} /> )
                  }
              </ul>
          </div>
          <GroupJoin />
        </div>
    );
};

export default GroupManager;