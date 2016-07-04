import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import App from '/imports/components/App';
import { NavMenuContainer } from '/imports/containers/AuthContainers';

if (Meteor.isClient) {
    describe('App', () => {
        it('should render', () => {
            const content = "Lorem ipsum";

            const app = shallow(<App
                    content={content}
                />);

            expect(app.find('div.container').text()).to.contain(content);
            expect(app.find('div.nav-wrapper').text().toLowerCase())
                        .to.contain('Domowe Rozliczenia'.toLowerCase());
            expect(app.find(NavMenuContainer)).to.have.length(1);
        });
    });
}
