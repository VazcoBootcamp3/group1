import React from 'react/react';

const Login = (props) => {
    return (
        <div className="row">
            <h4>Logowanie</h4>
            <form className="col offset-s3 s6" onSubmit={props.functions.login}>
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
