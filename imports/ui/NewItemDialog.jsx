import React from 'react';
import {Meteor} from 'meteor/meteor';

// material-ui
import Dialog from 'material-ui/Dialog';

import {Items} from '/imports/api/items';
import {Debts} from '/imports/api/debts';

import DialogForm from '/imports/ui/Dialog/DialogForm';
import DialogButtons from '/imports/ui/Dialog/DialogButtons';

export default class NewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogStatus: false,
        };

        this._closeDialog = this._closeDialog.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dialogStatus: nextProps.open, 
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
        });
    }

    render() {
        return(
            <div className="dialog">
                <Dialog
                    title="Add new item"
                    actions={<DialogButtons 
                                handleDone={this._handleSubmit.bind(this)}
                                handleClose={this._closeDialog.bind(this)}
                            />}
                    modal={false}
                    open={this.state.dialogStatus}
                    onRequestClose={this._closeDialog.bind(this)}
                    autoScrollBodyContent={true}
                >
                    <DialogForm
                        ref="DialogForm"
                        users={this.props.users}
                    />
                </Dialog>
            </div>
        );
    }
}