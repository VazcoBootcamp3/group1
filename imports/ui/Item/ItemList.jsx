import React, {PropTypes} from 'react';

import {ItemContainer} from '/imports/containers/Item/ItemContainer';
import ItemNewItemButton from '/imports/ui/Item/ItemNewItemButton';


const ItemList = (props) =>
    <div>
        {props.items.map((value, key) => {
            return <ItemContainer key={key} item={value} />;
        })}
        <ItemNewItemButton users={props.users} />
    </div>;

export default ItemList;