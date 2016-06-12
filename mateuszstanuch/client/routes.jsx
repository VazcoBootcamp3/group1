import React from 'react';
import {mount} from 'react-mounter';

import AppLayout from '../components/App';
import Register from '../components/Register';
import Checkout from '../components/Checkout';
import Report from '../components/Report';

FlowRouter.route("/", {
    action () {
        mount(AppLayout, {
            content: ":)"
        });
    }
});

FlowRouter.route("/register", {
    action () {
        mount(AppLayout, {
            content: <Register />
        });
    }
});

FlowRouter.route('/report', {
    action () {
        mount(AppLayout, {
            content: <Report />
        })
    }
});

FlowRouter.route("/checkout", {
    action () {
        mount(AppLayout, {
            content: <Checkout />
        })
    }
})