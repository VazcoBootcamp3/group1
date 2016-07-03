import React from 'react';
import {Meteor} from 'meteor/meteor';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack, indigo900, blue300, red500, green500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import '/imports/api/debts.js';



export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    showAvatars() {
    	return(
    	<Avatar
          icon={<FontIcon className="muidocs-icon-communication-voicemail" />}
          color={blue300}
          backgroundColor={indigo900}
          size={16}
        />
        );
    }

    _renderContactAndBalance() {
    	return(
	        <p>
	          <strong>Contact: </strong> +48 525 663 532, brendan@to.maupa<br />
	          <strong>Balance: </strong> -136,36 zł      
        	</p>
    	);
    }

    render() {
      Meteor.call('debts.shouldPay', Meteor.userId(), (error, data) => {
        if(error) console.log(error);
        if(data) console.log(data);
      })

    	return(
    		<List>	
		        <ListItem
		          leftAvatar={<Avatar src="http://www.material-ui.com/images/ok-128.jpg" />}
			      primaryTogglesNestedList={true}
		          primaryText="Brendan Lim"
		          secondaryText={this._renderContactAndBalance()}
		          nestedItems={[
              		<ListItem key={1} primaryText="Dmitrij Dzikov" leftAvatar={<Avatar src="http://www.material-ui.com/images/kolage-128.jpg" />}
              		secondaryText={<p>should pay: <span style={{color: green500}}>+21,50zł</span></p>} secondaryTextLines={2}
              		/>,

              		<ListItem key={2} primaryText="Oui Sokapeso" leftAvatar={<Avatar src="http://www.material-ui.com/images/uxceo-128.jpg" />} 
              		secondaryText={<p>should gain: <span style={{color: red500}}>-200,00zł</span></p>} secondaryTextLines={2}
              		/>,

            	  ]}
		          secondaryTextLines={2}
		        />
		        <Divider inset={true} />

		         <ListItem
			          leftAvatar={<Avatar src="http://www.material-ui.com/images/kolage-128.jpg" />}
			          primaryText="Dmitrij Dzikov"
			          secondaryText={
			          	<p>
		              <strong>Contact: </strong> +48 525 663 532, brendan@to.maupa<br />
		              <strong>Balance: </strong> <span style={{color: red500}}>-200,00zł</span>
			            </p>
			          }
			          secondaryTextLines={2}
			        />
			        <Divider inset={true} />

			        <ListItem
			          leftAvatar={<Avatar src="http://www.material-ui.com/images/uxceo-128.jpg" />}
			          primaryText="Oui Sokapeso"
			          secondaryText={
			            <p>
		              <strong>Contact: </strong> +48 525 663 532, brendan@to.maupa<br />
		              <strong>Balance: </strong> <span style={{color: green500}}>+3,21zł</span>
			            </p>
			          }
			          secondaryTextLines={2}
       				 />
		    </List>
    	);
    }
}