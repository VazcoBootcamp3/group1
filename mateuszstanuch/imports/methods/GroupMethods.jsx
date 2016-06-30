import { Meteor } from 'meteor/meteor';

export const leaveGroup = (id) => {
    if(id) {
        Meteor.call('groups.leaveGroup', {groupId: id},
            (err, res) => {
                if(err) {
                    Materialize.toast(err.reason, 4000);
                } else {
                    Materialize.toast(res, 4000);
                }
            })
    }
};

export const onSubmitCreateGroup = (e) => {
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
};