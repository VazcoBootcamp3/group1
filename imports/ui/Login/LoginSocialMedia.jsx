import React 		from 'react';

// material-ui
import Subheader 	from 'material-ui/Subheader';
import IconButton 	from 'material-ui/IconButton';


const SocialMedia = () =>
    <div>
	    <Subheader>Sign in with a social network:</Subheader>
		<div className="login-social-btn">
			<IconButton
			    iconClassName="muidocs-icon-custom-github" 
			    tooltip="github"
			    tooltipPosition="top-right"
			/>
		</div>
	</div>;

export default SocialMedia;