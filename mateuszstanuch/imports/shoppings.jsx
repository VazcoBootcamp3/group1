const ShoppingList = new UniCollection('shoppings');

ShoppingList.setSchema(new SimpleSchema({
    buyer: {
        type: String
    },
    indebted: {
        type: String
    },
    indebtedGroup: {
        type: String
    },
    price: {
        type: Number,
        decimal: true
    },
    products: {
        type: String,
        max: 300
    },
    paid: {
        type: Boolean
    }
}));

export default ShoppingList;