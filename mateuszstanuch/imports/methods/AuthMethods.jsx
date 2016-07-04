import { Accounts } from 'meteor/accounts-base';

export const login = (e) => {
    e.preventDefault();

    const form = e.target;

    let username = form.querySelector('[name=username]').value;
    let password = form.querySelector('[name=password]').value;

    if(password !== '' && username != '') {
        Meteor.loginWithPassword(username, password, (error) => {
            if(error) {
                Materialize.toast(error.reason, 4000);
                return;
            }

            Materialize.toast("Pomyślnie zalogowano!", 4000);
            FlowRouter.go('Home');
        });
    } else {
        Materialize.toast("Wypełnij wszystkie pola", 4000);
    }
};

export const register = (e) => {
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
};

export const logout = () => {
    Meteor.logout(error => {
        if(error) {
            Materialize.toast(error.reason, 4000);
        } else {
            Materialize.toast("Pomyślnie wylogowano :)", 4000);
            FlowRouter.go('Home');
        }
    })
};