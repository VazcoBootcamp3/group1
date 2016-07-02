import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import Report from '/imports/components/Report';
import { ReportItem } from '/imports/components/ReportItem';

if (Meteor.isClient) {
    const functions = {
        settleDebt: () => true,
    };

    describe('Report', () => {
        it('should render', () => {
            const report = shallow(<Report
                    shoppings={[]}
                    functions={functions}
                />);

            expect(report.find('h3').text()).to.contain('Podsumowanie');
        });

        it('should render zero items', () => {
            const report = shallow(<Report
                shoppings={[]}
                functions={functions}
            />);

            expect(report.find('h3').text().toLowerCase()).to.contain('podsumowanie');
            expect(report.find('h4').text().toLowerCase()).to.contain('nie posiadasz');
            expect(report.find(ReportItem)).to.have.length(0);
        });

        it('should render one item', () => {
            const shoppings = [
                {
                    balance: 123,
                    id: Random.id(),
                    name: 'John Doe',
                },
            ];

            const report = shallow(<Report
                shoppings={shoppings}
                functions={functions}
            />);

            expect(report.find(ReportItem)).to.have.length(1);
        });

        it('should render three items', () => {
            const shoppings = [
                {
                    balance: 123,
                    id: Random.id(),
                    name: 'John Doe',
                },
                {
                    balance: 999,
                    id: Random.id(),
                    name: 'Jan Kowalski',
                },
                {
                    balance: -85,
                    id: Random.id(),
                    name: 'Adam Nowak',
                },
            ];

            const report = shallow(<Report
                shoppings={shoppings}
                functions={functions}
            />);

            expect(report.find(ReportItem)).to.have.length(3);
        });
    });
}
