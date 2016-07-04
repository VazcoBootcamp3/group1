import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import Login from '/imports/components/Login';

if (Meteor.isClient) {

    const functions = {
        login: sinon.spy(),
    };

    describe('Login', () => {
        it('should render', () => {
            const login = shallow(<Login
                functions={functions}
            />);
            expect(login.find('h4').text()).to.contain('Logowanie');
            assert(login.find('input[name="username"]'));
            assert(login.find('input[name="password"]'));
            expect(login.find('button').text()).to.contain('Zaloguj');
        });

        it('should call `login` on submit', () => {
            const login = shallow(<Login
                functions={functions}
            />);

            login.find('form').last().simulate('submit');
            assert(functions.login.calledOnce);
        });
    });
}
