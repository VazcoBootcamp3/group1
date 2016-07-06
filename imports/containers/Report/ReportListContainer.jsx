import {composeWithTracker} from 'react-komposer';
import LoadingComponent from '/imports/ui/LoadingComponent';

import ReportList from '/imports/ui/Report/ReportList';


const composer = (props, onData) => {
	if(Meteor.subscribe('users').ready()) 
	{
		const users = Meteor.users.find({}).fetch();
		onData(null, {users});
	}
};

export const ReportListContainer = composeWithTracker(composer, LoadingComponent)(ReportList);