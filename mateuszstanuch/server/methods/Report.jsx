import ShoppingList from '/imports/shoppings';


export const reportSettleDebt = new ValidatedMethod({
    name: 'report.settle',

    validate({ secondUserId }) {
        const errors = [];
        const secondUser = Meteor.users.findOne(secondUserId);

        if(!secondUser) {
            errors.push({
                name: 'secondUserId',
                type: 'not found',
                details: {
                    value: secondUserId
                }
            });
        }

        if (errors.length) {
            throw new ValidationError(errors);
        }
    },

    run({ secondUserId }) {
        let currentUserId = Meteor.userId();
        if( !currentUserId ) {
            throw new Meteor.Error('report.settle.notLoggedIn',
                'Nie jestes zalogowany!');
        }

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
    }
});
