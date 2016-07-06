import React from 'react';

import {ReportBoxContainer} from '/imports/containers/Report/ReportBoxContainer';

// material-ui
import {List} from 'material-ui/List';
import Divider from 'material-ui/Divider';

const ReportList = (props) =>
	<List>	
    	{props.users.map((value, key) => {
    		return <ReportBoxContainer
	    		key={key}
	    		user={value}
    		/>
    	})}
    	<Divider inset={true} />  
    </List>;


export default ReportList;