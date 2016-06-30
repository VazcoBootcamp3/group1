import { Meteor } from 'meteor/meteor';

export const getSummary = (shoppings) => {
    let shoppingsDict = {};
    let usernames = {};
    let currentUserId = Meteor.userId();

    for(let s of shoppings) {
        if( ! s.paid ) {
            if(s.buyer !== currentUserId) {
                // Somebody buys for current user
                // Current user owed money - minus
                if(s.buyer in shoppingsDict) {
                    shoppingsDict[s.buyer] -= s.price;
                } else {
                    shoppingsDict[s.buyer] = -s.price;
                    usernames[s.buyer] = s.buyerName;
                }
            }
            if(s.indebted !== currentUserId) {
                if(s.indebted in shoppingsDict) {
                    shoppingsDict[s.indebted] += s.price;
                } else {
                    shoppingsDict[s.indebted] = +s.price;
                    usernames[s.indebted] = s.indebtedName;
                }
            }
        }
    }

    let shoppingsSummary = [];
    for(let key in shoppingsDict) {
        let balance = shoppingsDict[key];

        if(balance < 0) {
            balance = 'Jesteś winien: ' + balance;
        } else if (balance > 0) {
            balance = 'Otrzymasz: ' + balance;
        } else {
            // Balance equals zero - no one has a debt
            continue;
        }

        shoppingsSummary.push({
            id: key,
            name: usernames[key],
            balance: balance,
        });
    }

    return shoppingsSummary;
};

export const settleDebt = (id) => {
    Meteor.call( 'report.settle', {secondUser: id}, (err, res) => {
        if(err) {
            Materialize.toast(err.reason, 4000);
        } else {
            Materialize.toast(res, 4000);
        }
    });
}