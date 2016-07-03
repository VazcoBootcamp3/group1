import {composeWithTracker} from 'react-komposer';
import RegisterBox from '/imports/ui/Register/RegisterBox';
import {Groups} from '/imports/api/Collections/groups.js';
import LoadingComponent from '/imports/ui/LoadingComponent';

const composer = (props, onData) => {
	if(Meteor.subscribe('groups-list').ready()) {
		const groups = Groups.find({}, {fields: {name: true}}).fetch();
		onData(null, {groups});
	}
};

export const RegisterContainer = composeWithTracker(composer, LoadingComponent)(RegisterBox);