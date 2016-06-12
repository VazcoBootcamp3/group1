import React from 'react';

import ShoppingListTable from '/components/ShoppingListTable';
import NewItemButton from '/components/NewItemButton';

export default class extends React.Component {
    render() {
        return(
            <div>
                <ShoppingListTable />
                <NewItemButton />
            </div>
        );
    }

}