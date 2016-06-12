import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

const users = [
    {'name': 'Alibaba', 'avatar': 'http://material-ui.com/images/uxceo-128.jpg'},
    {'name': 'Shrek', 'avatar': 'https://cdn1.iconfinder.com/data/icons/smashicons-movies-yellow/61/75_-Shrek-_Yellow-128.png'},
    {'name': 'Pikachu', 'avatar': 'http://cdn-img.easyicon.net/png/5792/579263.gif'},
];

export default class extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            nameValue: 0,
            shareWith: [],
            possibleChoice: users,
        };

        this.changeNameValue = this.changeNameValue.bind(this);
        this.addToShare = this.addToShare.bind(this);
        this.rmFromShare = this.rmFromShare.bind(this);
    }

    changeNameValue(event, index, value) {
        // TODO
        this.setState({
            nameValue: index,
        });
    }

    addToShare(event, index, value) {
        // TODO
        let tmp = this.state.shareWith;
        tmp.push(users[value]);
        this.setState({
            shareWith: tmp,
        })
    }

    rmFromShare(user) { delete this.state.shareWith.user; }

    render() {
        return(
        <div style={{height: '600px'}}>
                <SelectField value={this.state.nameValue} onChange={this.changeNameValue} fullWidth={true} floatingLabelText="Your name">
                    {users.map((value, key) => (
                        <MenuItem value={key} primaryText={value.name} />
                    ))}
                </SelectField>


                <DatePicker
                    hintText="Date"
                    container="inline"
                    mode="landscape"
                    fullWidth={true}
                />

                <TextField
                    floatingLabelText="Products list"
                    multiLine={true}
                    rows={2}
                    fullWidth={true}
                />

                <TextField
                    hintText="Total cost"
                    fullWidth={true}
                />

                <SelectField value={this.state.shareValue} onChange={this.addToShare} fullWidth={true} floatingLabelText="Add to share">
                    {this.state.possibleChoice.map((value, key) => (
                        <MenuItem value={key} primaryText={value.name} />
                    ))}
                </SelectField>

                <List>
                    <Subheader>Share with</Subheader>
                    {this.state.shareWith.map((value, key) => (
                        <ListItem
                            primaryText={value.name}
                            leftAvatar={<Avatar src={value.avatar} />}
                            onTouchTap={this.rmFromShare(value)}
                        />
                    ))}

                </List>


            </div>

        );
    }
}