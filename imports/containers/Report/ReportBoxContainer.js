import {Meteor} from 'meteor/meteor';
import {composeWithTracker} from 'react-komposer';
import ReportBox from '/imports/ui/Report/ReportBox';
import LoadingComponent from '/imports/ui/LoadingComponent';

// import '/imports/api/debts.js';
import {Debts} from '/imports/api/Collections/debts.js';

// props
// props.item - item

const composer = (props, onData) => {
	const user = props.user;

	Meteor.call('debts.balance', user._id, (error, result) => {
		if(error) console.log('error', error);
		if(result) {
			result.map(value => {
				const debtUserInfo = Meteor.users.findOne(value._id);
				value.username = debtUserInfo.username;
				value.avatar = debtUserInfo.profile.avatar;
			});
			onData(null, {user, balance: result});
		}
	});
};

export const ReportBoxContainer = composeWithTracker(composer, null)(ReportBox);