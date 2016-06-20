import React from 'react/react';
import { mount } from 'react-mounter';

import AppLayout from '../components/App';
import { LoginContainer, RegisterContainer } from '../containers/AuthContainers';
import Checkout from '../components/Checkout';
import { ReportContainer } from '../containers/ReportContainer';
import { HomeContainer } from '../containers/HomeContainer';
import { GroupContainer } from  '../containers/GroupContainers';

FlowRouter.route("/", {
    name: 'Home',
    action () {
        mount(AppLayout, {
            content: <HomeContainer />
        });
    }
});

FlowRouter.route("/login", {
    name: 'Login',
    action () {
        mount(AppLayout, {
            content: <LoginContainer />
        });
    }
});

FlowRouter.route("/register", {
    name: 'Register',
    action () {
        mount(AppLayout, {
            content: <RegisterContainer />
        });
    }
});

FlowRouter.route("/group", {
    name: 'Group',
    action () {
        mount(AppLayout, {
            content: <GroupContainer />
        });
    }
});

FlowRouter.route('/report', {
    name: 'Report',
    action () {
        mount(AppLayout, {
            content: <ReportContainer />
        })
    }
});

FlowRouter.route("/checkout", {
    name: 'Checkout',
    action () {
        mount(AppLayout, {
            content: <Checkout />
        })
    }
});

FlowRouter.notFound = {
  action () {
      mount(AppLayout, {
        content: "Nie znaleziono takiej strony"
      })
  }
};