import React from 'react';
import {Meteor} from 'meteor/meteor';

// material-ui
import Dialog from 'material-ui/Dialog';

import {Items} from '/imports/api/items';
import {Debts} from '/imports/api/debts';

import DialogForm from '/imports/ui/Dialog/DialogForm';
import DialogButtons from '/imports/ui/Dialog/DialogButtons';

import {handleAddNew} from '/imports/api/Dialog/handleAddNew';


export default class NewItem extends React.Component {
    render() {
            console.log(this.props);
        return(
            <div>
                <Dialog
                    title="Add new item"
                    actions={<DialogButtons 
                                handleDone={() => {handleAddNew(this.refs)}}
                                handleClose={this.props.handleClose}
                            />}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose}
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