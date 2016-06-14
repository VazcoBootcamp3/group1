import React from 'react';

import NewItemButton from '/imports/ui/NewItemButton';
import Item from '/imports/ui/Item';

export default class extends React.Component {
    _renderItems() {
    	return this.props.items.map((item) => (
    		<Item key={item._id} item={item} />
    	));
    }

    render() {
        return(
            <div>
                {this._renderItems()}
                <NewItemButton />
            </div>
        );
    }

}