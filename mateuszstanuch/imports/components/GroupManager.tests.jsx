import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'meteor/practicalmeteor:chai';

import GroupManager from '/imports/components/GroupManager';
import { GroupJoin } from './GroupJoin';
import { GroupItem } from './GroupItem';

if (Meteor.isClient) {
    const functions = {
        leaveGroup: (e) => true,
        createOrJoinGroup: (e) => true,
    };

    describe('GroupManager', () => {
        it('should render', () => {
            const manager = shallow(<GroupManager
                    groups={[]}
                    functions={functions}
                />);

            expect(manager.find('li.collection-header > h4').text()).to.contain('Grupy');
            expect(manager.find(GroupJoin)).to.have.length(1);
        });

        it('should not list user groups', () => {
            const manager = shallow(<GroupManager
                groups={[]}
                functions={functions}
            />);

            expect(manager.find(GroupItem)).to.have.length(0);
        });

        it('should list user group (single)', () => {
            const groups = [
                {
                    id: Random.id(),
                    name: 'xoxo',
                }
            ];

            const manager = shallow(<GroupManager
                groups={groups}
                functions={functions}
            />);

            expect(manager.find(GroupItem)).to.have.length(1);
        });

        it('should list user groups (multiple)', () => {
            const groups = [
                {
                    id: Random.id(),
                    name: 'xoxo',
                },
                {
                    id: Random.id(),
                    name: 'lalla',
                },
                {
                    id: Random.id(),
                    name: 'donkeys',
                }
            ];

            const manager = shallow(<GroupManager
                groups={groups}
                functions={functions}
            />);

            expect(manager.find(GroupItem)).to.have.length(groups.length);
        });
    });

}
