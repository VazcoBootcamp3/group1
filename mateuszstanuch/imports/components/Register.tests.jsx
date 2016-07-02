import { Meteor } from 'meteor/meteor';
import React from 'react';
import { shallow } from 'enzyme';
import { assert, expect } from 'meteor/practicalmeteor:chai';
import { sinon } from 'meteor/practicalmeteor:sinon';
import Register from '/imports/components/Register';

if (Meteor.isClient) {

    const functions = {
        register: sinon.spy(),
    };

    describe('Register', () => {
        it('should render', () => {
            const register = shallow(<Register
                functions={functions}
            />);

            expect(register.find('h4').text()).to.contain('Rejestracja');
            assert(register.find('input[name="username"]'));
            assert(register.find('input[name="password"]'));
            assert(register.find('input[name="confirmpassword"]'));
            expect(register.find('button').text()).to.contain('Zarejestruj');
        });

        it('should call `register` on submit', () => {
            const register = shallow(<Register
                functions={functions}
            />);

            register.find('form').last().simulate('submit');
            assert(functions.register.calledOnce);
        });
    });
}
