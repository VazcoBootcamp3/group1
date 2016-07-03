import ShoppingList from '/imports/shoppings';

Meteor.methods({
    'report.settle'({secondUser}) {
        let currentUserId = Meteor.userId();
        if( currentUserId ) {
            let secondUserId = Meteor.users.findOne(secondUser);
            if( !secondUserId ) {
                throw new Meteor.Error('report.settle.userNotFound',
                    'Wystąpił błąd - drugi użytkownik nie istnieje');
            }

            secondUserId = secondUserId._id;

            ShoppingList.update({ $and:
            [
                {
                    $or: [
                        {buyer: {$eq: currentUserId}},
                        {indebted: {$eq: currentUserId}}
                    ]
                },
                {
                    $or: [
                        {buyer: {$eq: secondUserId}},
                        {indebted: {$eq: secondUserId}}
                    ]
                }
            ]
            }, {
                $set: {
                    paid: true
                }
            }, {
                multi: true
            });

            return "Uregulowano należności";

        } else {
            throw new Meteor.Error('report.settle.notLoggedIn',
                'Nie jestes zalogowany!');
        }
    }
});