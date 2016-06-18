
import GroupList from '../../imports/groups';

Meteor.methods({
    'groups.createOrJoin'({groupName, userId}) {
        // TODO get from Mongo only required fields
        // TODO DRY
        if(groupName === '' || userId === '') {
            // TODO check if user exist ! (pub&sub ?)
            throw new Meteor.Error('groups.updateText.unauthorized',
                'Nie jesteś zalogowany lub nie wypełniłeś wszystkich pól');
        }

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
    }
});