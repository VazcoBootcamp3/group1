import GroupList from '../../imports/groups';
import ShoppingList from '../../imports/shoppings';

Meteor.methods({
    'checkout.create'({buyer, isBuyerGroup, indebted, isIndebtedGroup, products, price, paid}) {
        // Looking for buyer in database
        let buyerId;
        if(isBuyerGroup) {
            buyerId = GroupList.findOne({name: buyer});
        } else {
            buyerId = Meteor.users.findOne({username: buyer});
        }
        if(!buyerId) {
            // user or group doesn't exist
            throw new Meteor.Error('checkout.create.buyerNotExist',
                'Podany kupujący nie istnieje');
        }
        // Looking for indebted in database
        let indebtedId;
        if(isIndebtedGroup) {
            indebtedId = GroupList.findOne({name: indebted});
        } else {
            indebtedId = Meteor.users.findOne({username: indebted});
        }

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

        // Umieszczenie zadłużenia w bazie danych
        ShoppingList.insert({
            buyer: buyerId,
            isBuyerGroup: isBuyerGroup,
            indebted: indebtedId,
            isIndebtedGroup: isIndebtedGroup,
            price: price,
            products: products,
            paid: paid,
        });


    }
});