
import GroupList from '/imports/groups';

Meteor.methods({
    'groups.createOrJoin'({groupName}) {
        if(!groupName || !groupName.trim()) {
            throw new Meteor.Error('groups.updateText.unauthorized',
                'Podaj nazwę grupy!');
        }
        groupName = groupName.trim();

        const userId = Meteor.userId();

        const group = GroupList.findOne({ name: groupName });

        if(!group) {
            // Creating new group
            let users = [ userId ];
            
            let groupId = GroupList.insert({
                name: groupName,
                users: users,
            });

            // Adding new group to profile['group']
            let userGroups = Meteor.users.findOne({_id: userId});
            userGroups = userGroups.services.groups;
            userGroups.push(groupId);

            Meteor.users.update({
                    _id: userId
            }, {
                $set: {
                    'services.groups': userGroups
                }
            });
        } else {
            // Adding new group to profile['group']
            let userGroups = Meteor.users.findOne({_id: userId});
            userGroups = userGroups.services.groups;
            userGroups.push(group._id);

            // Prevent double join
            userGroups = new Set(userGroups);
            userGroups = [...userGroups];

            // update User
            Meteor.users.update({
                _id: userId
            }, {
                $set: {
                    'services.groups': userGroups
                }
            });

            // adding new user
            let groupUsers = group.users;
            groupUsers.push(userId);

            // prevent double join
            groupUsers = new Set(groupUsers);
            groupUsers = [...groupUsers];

            // update users in group
            GroupList.update({
                _id: group._id,
            }, {
                $set: {
                    users: groupUsers,
                }
            });
        }
        return "Pomyślnie wykonano operacje :)";
    },

    'groups.leaveGroup'({groupId}) {
        const userId = Meteor.userId();
        const group = GroupList.findOne(groupId);

        // remove user from group
        group.update( {
            $pull: {
                users: userId
            }
        });

        // has group any members ?
        group.refresh();
        if( group.users.length === 0) {
            group.remove();
        }

        // remove group from user services
        Meteor.users.update({
            _id: userId,
        }, {
            $pull: {
                'services.groups': groupId
            }
        });

        return "Pomyślnie usunięto z grupy";
    },
});