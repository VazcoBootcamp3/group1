import React from 'react/react';

const Register = (props) => {
    return (
        <div className="row">
            <h4>Rejestracja nowego konta</h4>
            <form className="col offset-s3 s6" onSubmit={props.functions.register}>
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