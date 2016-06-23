import React from 'react/react';
import { Accounts } from 'meteor/accounts-base';

function onSubmit (e) {
    e.preventDefault();

    const form = e.target;

    let username = form.querySelector('[name=username]').value;
    let password = form.querySelector('[name=password]').value;
    let confirmPassword = form.querySelector('[name=confirmpassword]').value;

    if(password === confirmPassword && password !== '' && confirmPassword !== '' && username != '') {
        let accountInfo = {
            username: username,
            password: password
        };

        Accounts.createUser(accountInfo, (error) => {
            if(error) {
                Materialize.toast(error.reason, 4000);
            } else {
                Meteor.loginWithPassword(username, password, (error) => {
                    if(error) {
                        Materialize.toast("Wystąpił błąd wewnętrzny, spróbuj ponownie później.", 4000);
                        return;
                    }
                    FlowRouter.go('Home');
                });
            }
        });

    } else {
        if(password !== confirmPassword) {
            Materialize.toast("Podane hasła nie są takie same", 4000);
        } else {
            Materialize.toast("Wypełnij wszystkie pola", 4000);
        }
    }
}

const Register = (props) => {
    return (
        <div className="row">
            <h4>Rejestracja nowego konta</h4>
            <form className="col offset-s3 s6" onSubmit={onSubmit}>
                <div className="input-field col s12">
                    <input type="text" placeholder="Nazwa użytkownika" name="username" />
                </div>
                <div className="input-field col s12">
                    <input type="password" placeholder="Hasło" name="password" />
                </div>
                <div className="input-field col s12">
                    <input type="password" placeholder="Powtórz hasło" name="confirmpassword" />
                </div>
                <button className="waves-effect waves-light btn-large">Zarejestruj</button>
            </form>
        </div>
    );
};

export default Register;