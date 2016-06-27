import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import NavMenu from '/imports/components/NavMenu';

if (!Meteor.isClient) {
} else {
    describe('Navigation', () => {
        it('should show navigation for logged in user', () => {
            const isLoggedIn = true;
            const nav = shallow(<NavMenu isLoggedIn={isLoggedIn}/>);
            assert(nav.find('#nav-mobile'));
            expect(nav.props().isLoggedIn).to.be.defined;
            expect(nav.find('ul').text()).to.contain('Wyloguj', 'Grupy');
            expect(nav.find('ul').text()).to.not.contain('Logowanie', 'Rejestracja');
        });

        it('should show navigation for non logged in user', () => {
            const isLoggedIn = false;
            const nav = shallow(<NavMenu isLoggedIn={isLoggedIn}/>);
            assert(nav.find('#nav-mobile'));
            expect(nav.props().isLoggedIn).to.be.defined;
            expect(nav.find('ul').text()).to.not.contain('Wyloguj', 'Grupy');
            expect(nav.find('ul').text()).to.contain('Logowanie', 'Rejestracja');
        });
        
    });
}
