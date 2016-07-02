import React from 'react/react';
import { GroupJoin } from './GroupJoin';
import { GroupItem } from './GroupItem';

const GroupManager = (props) => {
    return (
        <div>
          <div className="row">
              <ul className="collection with-header">
                  <li className="collection-header">
                      <h4>Grupy do których należysz</h4>
                  </li>
                  {(props.groups).map((group, key) => {
                      return (
                          <GroupItem
                              groupname={group.name}
                              groupid={group._id}
                              functions={props.functions}
                              key={key}
                          />
                      )
                  })}
              </ul>
          </div>
          <GroupJoin functions={props.functions} />
        </div>
    );
};

export default GroupManager;