import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';

import Checkout from './Checkout';

if (Meteor.isClient) {
    const onSubmit = sinon.spy();

    describe('Checkout', () => {
        it('should render', () => {
            const item = shallow(<Checkout />);

            expect(item.find('h5').first().text().toLowerCase()).to.contain('wpisz nazwę');
            expect(item.find('[name="buyer"]'));
            expect(item.find('[name="indebted"]'));
            expect(item.find('[name="price"]'));
            expect(item.find('[name="products"]'));
            expect(item.find('button'));
        });

        it('should call function on event', () => {
            const item = shallow(<Checkout />);
            item.find('button').simulate('click');
            // TODO: composer or... ?
        });

    });

}
