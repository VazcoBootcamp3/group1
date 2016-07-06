import React from 'react';
import {Meteor} from 'meteor/meteor';

import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import ReportSecondaryText from '/imports/ui/Report/ReportSecondaryText';
import ReportNested from '/imports/ui/Report/ReportNested';


const ReportBox = (props) =>
  <ListItem
    leftAvatar={<Avatar src={props.user.profile.avatar} />}
    primaryTogglesNestedList={true}
    primaryText={props.user.username}
    secondaryText={<ReportSecondaryText phone={props.user.profile.phone} balance='0.00' />}
    nestedItems={
      props.balance.map((value, key) => {
        return <ReportNested 
                  key={key}
                  username={value.username}
                  avatar={value.avatar}
                  value={value.debt}
              />
      })}
  />;

export default ReportBox;