export const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    let shopping = {
        buyer: form.querySelector('[name=buyer]').value,
        indebted: form.querySelector('[name=indebted]').value,
        products: form.querySelector('[name=products]').value,
        price: form.querySelector('[name=price]').value,
    };

    if(shopping.buyer !== "" && shopping.indebted !== "" && shopping.buyer !== shopping.indebted && shopping.products !== "" && shopping.price !== "" ) {
        Meteor.call('checkout.create', shopping, (err, res) => {
            if (err) {
                Materialize.toast(err.reason, 4000);
            } else {
                Materialize.toast(res, 4000);
                FlowRouter.go('Report');
            }
        });
    } else {
        if(shopping.indebted === shopping.buyer) {
            Materialize.toast("Kupujący i dłużny powinni być różnymi osobami", 4000);
        } else {
            Materialize.toast("Wypełnij wszystkie pola w formularzu", 4000);
        }
    }
};
