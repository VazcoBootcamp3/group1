import React from 'react';

// material-ui
import Dialog from 'material-ui/Dialog';

import DialogForm from '/imports/ui/Dialog/DialogForm';
import DialogButtons from '/imports/ui/Dialog/DialogButtons';

import {handleAddNew} from '/imports/api/Dialog/handleAddNew';


class DialogBox extends React.Component {
    render() {
        return(
            <div>
                <Dialog
                    title="Add new item"
                    actions={<DialogButtons 
                                handleDone={() => {handleAddNew(this.refs.DialogForm.refs)}}
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

export default DialogBox;