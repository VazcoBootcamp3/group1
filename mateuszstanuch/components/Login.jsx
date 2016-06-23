import React from 'react/react';

function onSubmit (e) {
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
}

const Login = (props) => {
    return (
        <div className="row">
            <h4>Logowanie</h4>
            <form className="col offset-s3 s6" onSubmit={onSubmit}>
                <div className="input-field col s12">
                    <input type="text" placeholder="Nazwa użytkownika" name="username" />
                </div>
                <div className="input-field col s12">
                    <input type="password" placeholder="Hasło" name="password" />
                </div>
                <button className="waves-effect waves-light btn-large">Zaloguj</button>
            </form>
        </div>
    );
};

export default Login;
