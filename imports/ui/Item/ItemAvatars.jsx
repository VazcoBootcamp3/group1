import React from 'react';

// material-ui
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

const ItemAvatars = (props) => 
	<div className="item-box">
		<Subheader>{props.header}</Subheader>
		<div className="item-t">
			{props.users.map((value, key) => {
				return (
					<IconButton
						key={key}
						tooltip={value.username} 
						touch={true} 
						tooltipPosition="top-right"
					>
						<Avatar
							key={key}
							className="item-avatar"
							src={value.profile.avatar}
						/>
					</IconButton>
					);
			})}
		</div>
	</div>;

ItemAvatars.propTypes = {
	header: React.PropTypes.string.isRequired,
	users: React.PropTypes.arrayOf(React.PropTypes.object),
}

export default ItemAvatars;


// props
// users (array) where debts(item).cost exist
//