import React from 'react';

// material-ui
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

// props
// users. array of users

class DialogShareWith extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shareWith: [],
            possibleChoice: this.props.users,
        };

        this._removeObject = this._removeObject.bind(this);
    }

    _removeObject(attr, value) {
        let i = this.state.possibleChoice.length;
        let tmp = this.state.possibleChoice.slice(0);
        while(i--) {
            if(tmp[i]
                && tmp[i].hasOwnProperty(attr)
                && tmp[i][attr] === value) {
                
                tmp.splice(i, 1);
            }
        }
        this.setState({
            possibleChoice: tmp, 
        });
    }

    _addToShare(e, index) {
        let tmp = this.state.shareWith;
        tmp.push(this.state.possibleChoice[index]);

        this._removeObject('_id', this.state.possibleChoice[index]._id);

        this.setState({
            shareWith: tmp, 
        });
    }

	render() {
		console.log(this.props.users);
		return(
			<div>
                <SelectField
	                onChange={this._addToShare.bind(this)}
	                fullWidth={true}
	                floatingLabelText="Add to share"
	                ref="addToShareInput"
                >
                    {this.state.possibleChoice.map((value, key) => (
                        <MenuItem 
	                        key={key}
							value={value._id}
							primaryText={value.username}
                        />
                    ))}
                </SelectField>

                <List>
                    <Subheader>Share with</Subheader>
                    {this.state.shareWith.map((value, key) => (
                        <ListItem
                            key={key}
                            primaryText={value.username}
                            leftAvatar={<Avatar src={value.profile.avatar} />}
                        />
                    ))}
                </List>
            </div>
		);
	}
}

export default DialogShareWith;