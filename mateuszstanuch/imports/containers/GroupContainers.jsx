import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import { leaveGroup, createOrJoinGroup } from '/imports/methods/GroupMethods';

import GroupList from '/imports/groups';
import GroupManager from '/imports/components/GroupManager'

const functions = {
    createOrJoinGroup: createOrJoinGroup,
    leaveGroup: leaveGroup,
};

const composer = ( props, onData ) => {
    if( Meteor.subscribe('group-list').ready() ) {
        const groups = GroupList.find({}).fetch();
        onData(null, {groups, functions});
    }
};

export const GroupContainer = composeWithTracker( composer )( GroupManager );