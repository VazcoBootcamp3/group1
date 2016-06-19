import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import GroupList from '../imports/groups';
import GroupManager from '../components/GroupManager'

const composer = ( props, onData ) => {
    if( Meteor.subscribe('group-list').ready() ) {
        const groups = GroupList.find({}).fetch();
        onData(null, {groups});
        console.log(groups);
    }
};

export const GroupContainer = composeWithTracker( composer )( GroupManager );