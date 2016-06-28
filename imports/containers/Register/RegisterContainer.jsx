import {composeWithTracker} from 'react-komposer';
import RegisterBox from '/imports/ui/Register/RegisterBox';
import {Groups} from '/imports/api/groups.js';

const composer = (props, onData) => {
	if(Meteor.subscribe('groups-list').ready()) {
		const groups = Groups.find({}, {fields: {name: true}}).fetch();
		onData(null, {groups});
	}
};

export const RegisterContainer = composeWithTracker(composer)(RegisterBox);