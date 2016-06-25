import React from 'react';

function onSubmit (e) {
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
}

const Checkout = (props) => {
    return (
        <div className="row">
            <div>
                <h5 className="center-align">Wpisz nazwę użytkownika, którego chcesz obciążyć lub 'group/nazwa-grupy', aby obciążyć całą grupę</h5>
            </div>
            <form className="col s12" onSubmit={onSubmit}>
                <div className="row">
                    <div className="input-field col s4">
                        <input placeholder="Kupujący" name="buyer" />
                    </div>
                    <div className="input-field col s4">
                        <input placeholder="Dłużny" name="indebted" />
                    </div>
                    <div className="input-field col s4">
                        <input placeholder="Kwota" type="number" step="any" name="price" />
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea className="materialize-textarea" name="products" />
                        <label htmlFor="shopping-list">Lista zakupów</label>
                    </div>
                </div>

                <button className="waves-effect waves-light btn-large">Dodaj</button>
            </form>
        </div>
    );
};

export default Checkout;