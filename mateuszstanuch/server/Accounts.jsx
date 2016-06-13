import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser((options, user) => {
   // creates array for groups
    user.services['groups'] = [];
    return user;
});