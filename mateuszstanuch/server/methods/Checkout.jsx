import ShoppingList from '/imports/shoppings';
import GroupList from '/imports/groups';

Meteor.methods({
    'checkout.create'({buyer, indebted, products, price}) {

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

        let buyerName = buyerId.username;
        buyerId = buyerId._id;


        // Get Ids of users in group or single user

        let indebtedIds; // variable for Ids

        // check if string contains `group/`
        // if contains, return array with two items
        // otherwise, returns array with one item
        const regex = /^group\//i;
        indebted = indebted.split(regex);

        // Get Ids of users in group
        if(indebted.length === 2) {
            indebtedIds = GroupList.findOne({ name: indebted[1] }, { fields: { users: 1 } });

            if(indebtedIds) // if found group
                indebtedIds = indebtedIds.users;

        } else {
            // get Id of single user
            indebtedIds = Meteor.users.findOne({ username: indebted[0] });

            if(indebtedIds) // if found user
                indebtedIds = [ indebtedIds._id ];
        }


        // Looking for indebted in database
        if(!indebtedIds || indebtedIds.length === 0) {
            // user or group doesn't exist
            throw new Meteor.Error('checkout.create.indebtedNotExist',
                'Podany dłużnik nie istnieje');
        }

        // Check if user is in group
        if(indebtedIds.indexOf(buyerId) === -1) {
            throw new Meteor.Error('checkout.create.notInGroup',
                'Nie należysz do tej grupy.');
        }

        // check if price is higher than 0
        if(price <= 0) {
            throw new Meteor.Error('checkout.create.priceIsLowerOrEqualZero',
                'Błędna kwota');
        }

        for(const userId of indebtedIds) {
            if(userId === buyerId) continue;

            // fields - only username, _id is return by default
            const indebtedUser = Meteor.users.findOne({_id: userId}, { fields: { username: 1 } });

            // Insert debt into collection
            ShoppingList.insert({
                buyer: buyerId,
                buyerName: buyerName,
                indebted: indebtedUser._id,
                indebtedName: indebtedUser.username,
                price: price,
                products: products,
                paid: false,
            });
        }
    }
});