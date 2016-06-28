import React from 'react';

// material-ui
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';


class RegisterGroup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			groupId: '',
			groupName: '',
            checked: false,
		};
	}

    _checkGroup(e, iic) {
        const checkBox = e.target;
        this.setState({
            groupId: checkBox.value,
            groupName: checkBox.checked ? checkBox.name : '',
            checked: checkBox.checked ? true : false, 
        });
    }

    _setGroupFromInput() {
        const groupInput = this.refs.group.getValue();

        this.setState({
            groupName: groupInput || '',
            groupId: '',
            checked: false, 
        });
    }

	render() {
		return(
			<div>
				<Subheader>Choose one from below:</Subheader>
				<List>
					{this.props.groupsList.map((value, key) => (
						<ListItem
							leftCheckbox={
							    <Checkbox
							        value={value._id}
							        name={value.name} 
							        onCheck={this._checkGroup.bind(this)}
							        checked={value.name === this.state.groupName}
							    />
							   }
							key={key}
							primaryText={value.name}
						/>
					))}
				</List>

				<Subheader>or create your own:</Subheader>
				<TextField
					className="register-group-field"
					floatingLabelText="Group name"
					fullWidth={true}
					ref="group"
					value={this.state.checked ? '' : this.state.groupName}
					onChange={this._setGroupFromInput.bind(this)}
				/>
			</div>
		);
	}
}

export default RegisterGroup;