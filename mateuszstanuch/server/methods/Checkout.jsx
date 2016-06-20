import ShoppingList from '../../imports/shoppings';

// TODO support groups

Meteor.methods({
    'checkout.create'({buyer, indebted, indebtedGroup, products, price}) {

        if( buyer === indebted ) {
            throw new Meteor.Error('checkout.create.buyerIsIndebted',
                'Kupujący powinien być dłużnikiem');
        }

        // Looking for buyer in database
        let buyerId = Meteor.users.findOne({username: buyer});

        if(!buyerId) {
            // user or group doesn't exist
            throw new Meteor.Error('checkout.create.buyerNotExist',
                'Podany kupujący nie istnieje');
        }

        // Looking for indebted in database
        let indebtedId;
        indebtedId = Meteor.users.findOne({username: indebted});

        if(!indebtedId) {
            // user or group doesn't exist
            throw new Meteor.Error('checkout.create.indebtedNotExist',
                'Podany dłużnik nie istnieje');
        }

        // check if price is higher than 0
        if(price <= 0) {
            throw new Meteor.Error('checkout.create.priceIsLowerOrEqualZero',
                'Błędna kwota');
        }

        buyerId = buyerId._id;
        indebtedId = indebtedId._id;

        // Insert debt into collection
        ShoppingList.insert({
            buyer: buyerId,
            indebted: indebtedId,
            indebtedGroup: indebtedGroup,
            price: price,
            products: products,
        });


    }
});