import React from 'react/react';
import GroupJoin from './GroupJoin';

function leaveGroup (id) {
    if(id) {
        Meteor.call('groups.leaveGroup', {groupId: id},
            (err, res) => {
                if(err) {
                    Materialize.toast(err.reason, 4000);
                } else {
                    Materialize.toast(res, 4000);
                }
            })
    }
}

const GroupItem = (props) => {
    return (
        <li className="collection-item">
            <div>
                {props.groupname}
                <a href="#!" className="secondary-content" onClick={() => { leaveGroup(props.groupid) }}>
                    <i className="material-icons">clear</i>
                </a>
            </div>
        </li>
    );
};

const GroupManager = (props) => {
    return (
        <div>
          <div className="row">
              <ul className="collection with-header">
                  <li className="collection-header">
                      <h4>Grupy do których należysz</h4>
                  </li>
                  {(props.groups).map((group, key) => <GroupItem groupname={group.name} groupid={group._id} key={key} /> )}
              </ul>
          </div>
          <GroupJoin />
        </div>
    );
};

export default GroupManager;