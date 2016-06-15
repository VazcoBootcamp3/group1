import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';

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
import {Debts} from '/imports/api/debts';

export default class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shareWith: [],
            possibleChoice: [],
            dialogStatus: false,
        };

        this._closeDialog = this._closeDialog.bind(this);
        this._removeObject = this._removeObject.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dialogStatus: nextProps.open, 
            possibleChoice: this.props.users,  
        });
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

        if(this.state.shareWith.length == 0) {
            alert("You should add somebody to share expense");
            return;
        }

        let productsInput = this.refs.productsInput.getValue();
        let dateInput = this.refs.dateInput.getDate()
        let totalCostInput = this.refs.totalCostInput.getValue();


        let itemId = Random.id();

        Items.insert({
            _id: itemId,
            creditor: Meteor.userId(),
            username: Meteor.user().username,
            products: productsInput,
            date: dateInput,
            totalCost: totalCostInput,
            createdAt: new Date(),
        });

        this.state.shareWith.map((value) => {
            Debts.insert({
                creditor: Meteor.userId(),
                debtor: value._id,
                item: itemId,
                cost: totalCostInput/(this.state.shareWith.length +1),
                createdAt: new Date(),
            });
        });
        


        this._closeDialog();
    }

    _closeDialog() {
        this.setState({
            dialogStatus: false,
            shareWith: [],
            possibleChoice: this.props.users,  
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
                <SelectField onChange={this._addToShare.bind(this)} fullWidth={true} floatingLabelText="Add to share" ref="addToShareInput">
                    {this.state.possibleChoice.map((value, key) => (
                        <MenuItem key={key}
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
                            leftAvatar={<Avatar src='' />}
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
    users: PropTypes.array.isRequired,
}