import React, {PropTypes} from 'react';

import {ItemContainer} from '/imports/containers/Item/ItemContainer';
import NewItemButton from '/imports/ui/NewItemButton';


const ItemList = (props) =>
    <div>
        {props.items.map((value, key) => {
            return <ItemContainer key={key} item={value} />;
        })}
        <NewItemButton />
    </div>;

export default ItemList;