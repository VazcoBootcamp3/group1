const ShoppingList = new UniCollection('shoppings');

ShoppingList.setSchema(new SimpleSchema({
    buyer: {
        type: String
    },
    isBuyerGroup: {
        type: Boolean
    },
    indebted: {
        type: String
    },
    isIndebtedGroup: {
        type: Boolean
    },
    price: {
        type: Number
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