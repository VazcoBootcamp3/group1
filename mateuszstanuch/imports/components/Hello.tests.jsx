import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import Hello from '/imports/components/Hello';

if(Meteor.isClient) {
    describe('Hello (Home Page)', () => {
        it('should render', () => {
            const username = 'random user';
            const hello = shallow(<Hello username={username} />);
            assert.equal(hello.find('h1').text(), 'Cześć, ' + username + '!');
        });
    });
}