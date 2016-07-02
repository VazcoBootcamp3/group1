import React from 'react';
import { onSubmit } from '/imports/methods/CheckoutMethods';

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