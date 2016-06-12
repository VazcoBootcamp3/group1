import React from 'react/react';
import { Accounts } from 'meteor/accounts-base';

export default class extends React.Component {
    constructor (...args) {
        super(...args);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit (e) {
        e.preventDefault();

        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let confirmPassword = this.refs.confirmpassword.value;

        if(password === confirmPassword && password !== '' && confirmPassword !== '' && username != '') {
            let accountInfo = {
                username: username,
                password: password
            }

            Accounts.createUser(accountInfo, (error) => {
                if(error) {
                    Materialize.toast(error.reason, 4000);
                } else {
                    Meteor.loginWithPassword(username, password, (error) => {
                       if(error) {
                           Materialize.toast("Wystąpił błąd wewnętrzny, spróbuj ponownie później.");
                           return;
                       }
                       FlowRouter.go('Home');
                    });
                }
            });

        } else {
            if(password !== confirmPassword) {
                Materialize.toast("Podane hasła nie są takie same");
            } else {
                Materialize.toast("Wypełnij wszystkie pola");
            }
        }
    }

    render () {
        return (
            <div className="row">
                <h4>Rejestracja nowego konta</h4>
                <form className="col offset-s3 s6" onSubmit={this.onSubmit}>
                    <div className="input-field col s12">
                        <input type="text" placeholder="Nazwa użytkownika" ref="username" />
                    </div>
                    <div className="input-field col s12">
                        <input type="password" placeholder="Hasło" ref="password" />
                    </div>
                    <div className="input-field col s12">
                        <input type="password" placeholder="Powtórz hasło" ref="confirmpassword" />
                    </div>
                    <button className="waves-effect waves-light btn-large">Zarejestruj</button>
                </form>
            </div>
        );
    }
}
