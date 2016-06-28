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
		const groups = [
			{'_id': '1234', 'name': 'Grupa1'},
			{'_id': '2234', 'name': 'Grupa2'},
			{'_id': '3334', 'name': 'Grupa3'},
			{'_id': '4434', 'name': 'Grupa4'},
		];

		return(
			<div>
				<Subheader>Choose one from below:</Subheader>
				<List>
					{groups.map((value, key) => (
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