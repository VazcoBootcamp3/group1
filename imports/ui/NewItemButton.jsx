import React, {PropTypes} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import NewItemDialog from '/imports/ui/NewItemDialog';


export default class NewItemButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    _openDialog() {
        this.setState({open: true});
    };

    _closeDialog() {
        this.setState({open: false});
    };

    render() {
        return(
            <div className="sl-add-btn">
                <FloatingActionButton
                    mini={true}
                    onTouchTap={this._openDialog.bind(this)}
                >
                    <ContentAdd />
                </FloatingActionButton>

                <NewItemDialog 
                    open={this.state.open}
                    handleClose={this._closeDialog.bind(this)}
                    users={this.props.users}
                    ref="NewItemDialog"
                />
            </div>
        );
    }
}