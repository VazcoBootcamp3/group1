import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import './Group';
import GroupList from '/imports/groups';

if( Meteor.isServer ) {
    describe('Group', () => {
        const u1_name = 'Antoni';
        const u2_name = 'Jarek';

        describe('create or join group', () => {
            beforeEach(() => {
                Meteor.users.remove({});
                GroupList.remove({});

                Accounts.createUser({username: u1_name});
                Accounts.createUser({username: u2_name});
            });

            it('should throw error if invalid group name', () => {
                const joinGroup = Meteor.server.method_handlers['groups.createOrJoin'];
                const invalidNames = [null, '', ' ', '  '];

                for(const name of invalidNames) {
                    assert.throws(() => {
                        joinGroup.apply(this, [{groupName: name}]);
                    }, Error, 'groups.updateText.unauthorized');
                }
            });

            it('can create new group', () => {
                let currentUser = Meteor.users.findOne({username: u1_name});
                const stub = sinon.stub(Meteor, 'userId', () => { return currentUser._id});
                const groupname = 'obroncy';

                const createGroup = Meteor.server.method_handlers['groups.createOrJoin'];

                assert.include(createGroup.apply(this, [{groupName: groupname}]), 'Pomyślnie wykonano');

                // refresh currentUser info
                currentUser = Meteor.users.findOne({username: u1_name});
                const userGroups = currentUser.services.groups;
                assert.equal(userGroups.length, 1);

                assert.equal(GroupList.find({}).count(), 1);
                const group = GroupList.findOne();
                assert.equal(group.users.length, 1);
                assert.equal(group.users[0], currentUser._id);

                assert.equal(userGroups[0], group._id);

                stub.restore();
            });

            it('can join group', () => {
                let currentUser = Meteor.users.findOne({username: u1_name});
                let usersInGroup = [ currentUser._id ]; // user ids in test group
                const stub = sinon.stub(Meteor, 'userId', () => { return currentUser._id});

                // create group, u1 is creator
                const groupname = 'obroncy';
                const createGroup = Meteor.server.method_handlers['groups.createOrJoin'];
                assert.include(createGroup.apply(this, [{groupName: groupname}]), 'Pomyślnie wykonano');
                // join group test
                currentUser = Meteor.users.findOne({username: u2_name});
                usersInGroup.push(currentUser._id);
                assert.include(createGroup.apply(this, [{groupName: groupname}]), 'Pomyślnie wykonano');

                currentUser = Meteor.users.findOne({username: u2_name}); // refresh
                const userGroups = currentUser.services.groups;

                assert.equal(userGroups.length, 1);
                assert.equal(GroupList.find({}).count(), 1);

                const group = GroupList.findOne();
                assert.equal(group.users.length, 2);
                assert.includeMembers(group.users, usersInGroup);

                assert.equal(userGroups[0], group._id);

                stub.restore();
            });
        });

        describe('leave group', () => {
            beforeEach(() => {
                Meteor.users.remove({});
                GroupList.remove({});

                Accounts.createUser({username: u1_name});
                Accounts.createUser({username: u2_name});
            });

            it('should throw error if group does not exist', () => {
                const stub = sinon.stub(Meteor, 'userId', () => { return currentUser._id});
                let currentUser = Meteor.users.findOne({username: u1_name});
                const groupId = Random.id();

                // leave group
                const leaveGroup = Meteor.server.method_handlers['groups.leaveGroup'];
                assert.throws( () => {
                        leaveGroup.apply(this, [{groupId: groupId}]);
                }, Error, 'groups.leaveGroup');

                const invalidIds = [ null, 123, 12.54 ];
                for(const id of invalidIds) {
                    assert.throws( () => {
                        leaveGroup.apply(this, [{groupId: id}]);
                    }, Error, 'validation-error');
                }

                stub.restore();
            });

            it('should remove group from user.services.groups', () => {
                const stub = sinon.stub(Meteor, 'userId', () => { return currentUser._id});
                let currentUser = Meteor.users.findOne({username: u1_name});
                const groupname = 'obroncy';
                // create new group
                const createGroup = Meteor.server.method_handlers['groups.createOrJoin'];
                createGroup.apply(this, [{groupName: groupname}]);
                // leave group
                const leaveGroup = Meteor.server.method_handlers['groups.leaveGroup'];
                const group = GroupList.findOne();

                assert.include(leaveGroup.apply(this, [{groupId: group._id}]), 'Pomyślnie usunięto');

                currentUser = Meteor.users.findOne({username: u1_name}); // refresh

                assert.equal(currentUser.services.groups.length, 0);

                stub.restore();
            });

            it('group is deleted if has not any user', () => {
                const stub = sinon.stub(Meteor, 'userId', () => { return currentUser._id});
                let currentUser = Meteor.users.findOne({username: u1_name});
                const groupname = 'obroncy';
                // create new group
                const createGroup = Meteor.server.method_handlers['groups.createOrJoin'];
                createGroup.apply(this, [{groupName: groupname}]);
                // leave group
                const group = GroupList.findOne();
                const leaveGroup = Meteor.server.method_handlers['groups.leaveGroup'];
                leaveGroup.apply(this, [{groupId: group._id}]);
                assert.equal(GroupList.find({}).count(), 0);

                stub.restore();
            });

            it('group is updated if user leaves it', () => {
                const stub = sinon.stub(Meteor, 'userId', () => { return currentUser._id});
                let currentUser = Meteor.users.findOne({username: u1_name});
                const groupname = 'obroncy';
                // create new group
                const createGroup = Meteor.server.method_handlers['groups.createOrJoin'];
                createGroup.apply(this, [{groupName: groupname}]);
                // add second user to group
                currentUser = Meteor.users.findOne({username: u2_name});
                createGroup.apply(this, [{groupName: groupname}]);
                // leave group
                let group = GroupList.findOne();
                const leaveGroup = Meteor.server.method_handlers['groups.leaveGroup'];

                assert.equal(GroupList.find({}).count(), 1);

                assert.equal(group.users.length, 2);
                // leave group
                leaveGroup.apply(this, [{groupId: group._id}]);
                group = GroupList.findOne(); // refresh
                assert.equal(group.users.length, 1);

                stub.restore();
            });

        });
    });
}