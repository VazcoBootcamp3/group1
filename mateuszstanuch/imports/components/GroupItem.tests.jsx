import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import { GroupItem } from './GroupItem';

if (Meteor.isClient) {
    const functions = {
        leaveGroup: sinon.spy(),
    };

    const data = {
        id: Random.id(),
        name: 'wow',
    };

    describe('GroupItem', () => {
        it('should render', () => {
            const item = shallow(<GroupItem
                groupname={data.name}
                groupid={data.id}
                functions={functions}
            />);

            expect(item.find('div').first().text()).to.contain(data.name);
        });

        it('should call `leaveGroup` on event', () => {
            const item = shallow(<GroupItem
                groupname={data.name}
                groupid={data.id}
                functions={functions}
            />);

            item.find('a').simulate('click');

            assert(functions.leaveGroup.firstCall);
            assert(functions.leaveGroup.calledWithExactly(data.id));
        });

    });

}
