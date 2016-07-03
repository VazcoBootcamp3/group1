import {Meteor} from 'meteor/meteor';


export const handleAddNew = (props) => {
	const errorNotification = (msg) =>
	    props.notification.addNotification({
	        message: msg,
	        level: 'error',
	        position: 'tr',
	    });

        const {productsInput, dateInput, totalCostInput, DialogShareWith} = props.DialogForm.refs;
        const {shareWith} = DialogShareWith.state;

        if(!productsInput.getValue()) {
            // alert("You should fill the products field.");
            errorNotification('You should fill the products field.');
            return;
        }

        if(!dateInput.getDate()) {
            alert("You should pick correct date.");
            return;
        }

        if(!totalCostInput.getValue()) {
            alert("You should fill the total cost field.");
            return;
        }

        if(shareWith.length == 0) {
            alert("You should add somebody to share expense");
            return;
        }

        const item = {
            products: productsInput.getValue(),
            date: dateInput.getDate(),
            totalCost: totalCostInput.getValue(),
            shareWith: shareWith,
        };

        Meteor.call('items.add', item);

        // this._closeDialog();
};