import React from 'react/react';
import { mount } from 'react-mounter';

import AppLayout from '/imports/components/App';
import { LoginContainer, RegisterContainer } from '/imports/containers/AuthContainers';
import Checkout from '/imports/components/Checkout';
import { ReportContainer } from '/imports/containers/ReportContainer';
import { HomeContainer } from '/imports/containers/HomeContainer';
import { GroupContainer } from  '/imports/containers/GroupContainers';

function checkLoggedIn (ctx, redirect) {
    if (!Meteor.userId()) {
        redirect('/')
    }
}

function checkLoggedOut (ctx, redirect) {
    if (Meteor.userId()) {
        redirect('/')
    }
}

// group of routes for logged in users
var privateRoutes = FlowRouter.group({
    name: 'private',
    triggersEnter: [
        checkLoggedIn
    ]
});

// group of routes for non logged in users
var beforeAuthRoutes = FlowRouter.group({
    name: 'beforeAuthRoutes',
    triggersEnter: [
        checkLoggedOut
    ]
});

// public routes
FlowRouter.route("/", {
    name: 'Home',
    action () {
        mount(AppLayout, {
            content: <HomeContainer />
        });
    }
});

// routes for non logged in users
beforeAuthRoutes.route("/login", {
    name: 'Login',
    action () {
        mount(AppLayout, {
            content: <LoginContainer />
        });
    }
});

beforeAuthRoutes.route("/register", {
    name: 'Register',
    action () {
        mount(AppLayout, {
            content: <RegisterContainer />
        });
    }
});

// routes for logged in
privateRoutes.route("/group", {
    name: 'Group',
    action () {
        mount(AppLayout, {
            content: <GroupContainer />
        });
    }
});

privateRoutes.route('/report', {
    name: 'Report',
    action () {
        mount(AppLayout, {
            content: <ReportContainer />
        })
    }
});

privateRoutes.route("/checkout", {
    name: 'Checkout',
    action () {
        mount(AppLayout, {
            content: <Checkout />
        })
    }
});

//
FlowRouter.notFound = {
  action () {
      mount(AppLayout, {
        content: "Nie znaleziono takiej strony"
      })
  }
};