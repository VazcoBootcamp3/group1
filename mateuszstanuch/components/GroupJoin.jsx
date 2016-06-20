import React from 'react/react';

export default class GroupJoin extends React.Component {
    constructor (...args) {
        super(...args);
        
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onSubmit (e) {
        e.preventDefault();
        let groupName = this.refs.groupName.value;
        let userId = Meteor.userId();

        if(groupName == '') {
            Materialize.toast("Uzupełnij nazwę grupy");
        } else {
            Meteor.call('groups.createOrJoin', {
                groupName: groupName,
                userId: userId
            }, (err, res) => {
                if (err) {
                    Materialize.toast(err.reason, 4000);
                } else {
                    Materialize.toast(res, 4000);

                    // clear value of refs
                    this.refs.groupName.value = '';
                }
            })
        }
    }

    render () {
        return (
                <div className="row">
                    <h4>Utwórz lub dołącz do grupy</h4>
                    <form className="col offset-s3 s6" onSubmit={this.onSubmit}>
                        <div className="input-field col s12">
                            <input type="text" placeholder="Nazwa grupy" ref="groupName" />
                        </div>
                        <button className="waves-effect waves-light btn-large">Utwórz lub Dołącz</button>
                    </form>
                </div>
            );
    }
}