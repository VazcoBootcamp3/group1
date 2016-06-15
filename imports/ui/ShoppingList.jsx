import React, {PropTypes} from 'react';

import NewItemButton from '/imports/ui/NewItemButton';
import Item from '/imports/ui/Item';

export default class ShoppingList extends React.Component {
    _renderItems() {
    	return this.props.items.map((item) => (
    		<Item key={item._id} item={item} />
    	));
    }

    render() {
        return(
            <div>
                {this._renderItems()}
                <NewItemButton users={this.props.users} />
            </div>
        );
    }

}

ShoppingList.propTypes = {
    users: PropTypes.array.isRequired,
}