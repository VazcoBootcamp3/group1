import React from 'react';

import {ListItem} from 'material-ui/List';
import {red500, green500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';

const ReportNested = (props) =>
      <ListItem className="report-nested"
	      primaryText={props.username}
	      leftAvatar={<Avatar src={props.avatar} />}
	      secondaryText={
	      	props.value > 0 ? 
	      	<p>should pay: <span style={{color: green500}}>+{props.value} zł</span></p>
	      	:
	      	<p>should gain: <span style={{color: red500}}>{props.value} zł</span></p>
	        }
	      
	      secondaryTextLines={2}
      />;

export default ReportNested;