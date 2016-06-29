import React from 'react';

// material-ui
import {CardHeader} from 'material-ui/Card';

const ItemHeader = (props) =>
    <CardHeader
      title={<span className="item-title">{props.username}</span>}
      subtitle={
      	<span>has spent {props.totalCost} zł on {props.date ? props.date.toDateString() : ''}</span>
      }
      avatar={props.avatar}
      actAsExpander={true}
      showExpandableButton={true}
    />;

export default ItemHeader;


// props
// username (string)
// totalCost
// date (date)
// avatar

// username, avatar -> user.{username, profile.avatar}

