import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {red100, green100} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';

import {Items} from '/imports/api/items';

export default class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shareWith: [],

            dialogStatus: false,
        };

        this._closeDialog = this._closeDialog.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dialogStatus: nextProps.open, 
        });
    }

    addToShare(event, index, value) {
    }

    _handleSubmit(event) {
        event.preventDefault();

        if(!this.refs.productsInput.getValue()) {
            alert("You should fill the products field.");
            return;
        }

        if(!this.refs.dateInput.getDate()) {
            alert("You should pick correct date.");
            return;
        }

        if(!this.refs.totalCostInput) {
            alert("You should fill the total cost field.");
            return;
        }



        Items.insert({
            debtor: Meteor.userId(),
            username: Meteor.user().username,
            products: this.refs.productsInput.getValue(),
            date: this.refs.dateInput.getDate(),
            totalCost: this.refs.totalCostInput.getValue(),
            createdAt: new Date(),
        });
    }

    _closeDialog() {
        this.setState({
            dialogStatus: false,
        });
    }

    _renderProductsInput() {
        return(
            <TextField
                floatingLabelText="Products list"
                multiLine={true}
                rows={2}
                fullWidth={true}
                ref="productsInput"
            />
        );
    }

    _renderDateInput() {
        return(
            <DatePicker
                hintText="Date"
                container="inline"
                mode="landscape"
                fullWidth={true}
                autoOk={true}
                ref="dateInput"
            />
        );
    }

    _renderTotalCostInput() {
        return(
            <TextField
                hintText="Total cost"
                fullWidth={true}
                type="number"
                ref="totalCostInput"
            />
        );
    }

    _renderShareInput() {
        return(
            <div>
                <SelectField onChange={this.addToShare} fullWidth={true} floatingLabelText="Add to share">

                </SelectField>

                <List>
                    <Subheader>Share with</Subheader>
                    {this.state.shareWith.map((value, key) => (
                        <ListItem
                            key={key}
                            primaryText={value.name}
                            leftAvatar={<Avatar src={value.avatar} />}
                        />
                    ))}
                </List>
            </div>
        );
    }

    render() {
        const dialogButtons = [
            <RaisedButton
                backgroundColor={green100}
                icon={<FontIcon className="material-icons">done</FontIcon>}
                onTouchTap={this._handleSubmit.bind(this)}
            />,
            <RaisedButton
                backgroundColor={red100}
                icon={<FontIcon className="material-icons">clear</FontIcon>}
                onTouchTap={this._closeDialog.bind(this)}
            />
        ];

        return(
            <div style={{height: '600px'}}>
                <Dialog
                    title="Add new item"
                    actions={dialogButtons}
                    modal={false}
                    open={this.state.dialogStatus}
                    onRequestClose={this._closeDialog.bind(this)}
                    autoScrollBodyContent={true}
                >
                    {this._renderProductsInput()}
                    {this._renderDateInput()}
                    {this._renderTotalCostInput()}
                    {this._renderShareInput()}
                </Dialog>
            </div>
        );
    }
}

NewItem.propTypes = {
    open: PropTypes.bool.isRequired,
}