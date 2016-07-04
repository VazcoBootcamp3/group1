import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import { GroupJoin } from './GroupJoin';

if (Meteor.isClient) {
    const functions = {
        createOrJoinGroup: sinon.spy(),
    };

    describe('GroupJoin', () => {
        it('should render', () => {
            const item = shallow(<GroupJoin
                functions={functions}
            />);

            expect(item.find('h4').first().text().toLowerCase()).to.contain('dołącz');
            expect(item.find('button').first().text().toLowerCase()).to.contain('dołącz');
        });

        it('should call function on event', () => {
            const item = shallow(<GroupJoin
                functions={functions}
            />);

            const name = 'Testowa';

            // TODO: fill form

            //item.find('[name="groupName"]').simulate('change', {target: {value: name}});
            //item.find('input').get(0).simulate('change', {target: {value: name}});

            //const input = item.find('input').get(0);
            //input.value = name;

            //console.log(item.find('input').get(0).props);

            item.find('form').simulate('submit');

            assert(functions.createOrJoinGroup.firstCall);
            //assert(functions.createOrJoinGroup.calledWith(name));
        });

    });

}
