import React from 'react/react';

function onSubmit (e) {
    e.preventDefault();

    const form = e.target;

    let groupName = form.querySelector('[name=groupName]').value;
    let userId = Meteor.userId();

    if(groupName == '') {
        Materialize.toast("Uzupełnij nazwę grupy", 4000);
    } else {
        Meteor.call('groups.createOrJoin', {
            groupName: groupName,
            userId: userId
        }, (err, res) => {
            if (err) {
                Materialize.toast(err.reason, 4000);
            } else {
                Materialize.toast(res, 4000);

                // clear value of text field
                form.querySelector('[name=groupName]').value = '';
            }
        })
    }
}

const GroupJoin = (props) => {
    return (
        <div className="row">
            <h4>Utwórz lub dołącz do grupy</h4>
            <form className="col offset-s3 s6" onSubmit={onSubmit}>
                <div className="input-field col s12">
                    <input type="text" placeholder="Nazwa grupy" name="groupName" />
                </div>
                <button className="waves-effect waves-light btn-large">Utwórz lub Dołącz</button>
            </form>
        </div>
    );
};

export default GroupJoin;