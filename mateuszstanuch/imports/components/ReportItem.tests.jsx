import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { ReportItem } from '/imports/components/ReportItem';

if (Meteor.isClient) {
    const functions = {
        settleDebt: sinon.spy(),
    };

    const shopping = {
        id: Random.id(),
        balance: 100,
        name: 'Joe Doe',
    };

    describe('ReportItem', () => {
        it('should render', () => {
            const item = shallow(<ReportItem
                    info={shopping}
                    functions={functions}
                />);

            // This word appear always
            expect(item.find('a').last().text().toLowerCase()).to.contain('ureguluj');
        });

        it('should contain name and properly balance', () => {
            const item = shallow(<ReportItem
                info={shopping}
                functions={functions}
            />);

            expect(item.find('span').first().text()).to.contain(shopping.name);
            expect(item.find('p').first().text()).to.equal(shopping.balance.toString());

            // test for negative balance
            const newBalance = -65.99;
            item.setProps({ info: {
                name: shopping.name,
                balance: newBalance,
                id: shopping.id,
            } });
            expect(item.find('p').first().text()).to.equal(newBalance.toString());
            expect(item.find('span').first().text()).to.contain(shopping.name);

        });

        it('should call `settleDebt` after event', () => {
            const item = shallow(<ReportItem
                info={shopping}
                functions={functions}
            />);
            
            item.find('a').last().simulate('click');
            assert(functions.settleDebt.firstCall);
            assert(functions.settleDebt.calledWithExactly(shopping.id));
        });
    });
}
