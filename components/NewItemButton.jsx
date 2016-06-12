import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';

import NewItemDialog from '/components/NewItemDialog';

export default class extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            open: false,
        };

        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    openDialog() {
        this.setState({open: true});
    };

    closeDialog() {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <RaisedButton
                backgroundColor="#C8E6C9"
                icon={<FontIcon className="material-icons">done</FontIcon>}
            />,
            <RaisedButton
                backgroundColor="#FFCDD2"
                icon={<FontIcon className="material-icons">clear</FontIcon>}
                onTouchTap={this.closeDialog}
            />

        ];

        return(
            <div className="sl-add-btn">
                <FloatingActionButton
                    mini={true}
                    onTouchTap={this.openDialog}
                >
                    <ContentAdd />
                </FloatingActionButton>

                <Dialog
                    title="Add new item"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.closeDialog}
                    autoScrollBodyContent={true}
                    >
                    <NewItemDialog />
                </Dialog>
                
            </div>

        );
    }
}