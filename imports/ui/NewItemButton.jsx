import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


import NewItemDialog from '/imports/ui/NewItemDialog';

export default class extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            open: false,
        };

    }

    openDialog() {
        this.setState({open: true});
    };

    closeDialog() {
        this.setState({open: false});
    };

    render() {
        return(
            <div className="sl-add-btn">
                <FloatingActionButton
                    mini={true}
                    onTouchTap={this.openDialog.bind(this)}
                >
                    <ContentAdd />
                </FloatingActionButton>

                <NewItemDialog open={this.state.open} />
                
            </div>

        );
    }
}