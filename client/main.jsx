import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App';
import CostItems from '../imports/api/costItems';
import { Users } from '../imports/api/users';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
