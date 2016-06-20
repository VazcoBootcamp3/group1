import React from 'react/react';

export default class Login extends React.Component {
    constructor (...args) {
        super(...args);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit (e) {
        e.preventDefault();

        let username = this.refs.username.value;
        let password = this.refs.password.value;

        if(password !== '' && username != '') {
            
            Meteor.loginWithPassword(username, password, (error) => {
                if(error) {
                    Materialize.toast(error.reason, 4000);
                    return;
                }

                FlowRouter.go('Home');
            });

        } else {
            Materialize.toast("Wypełnij wszystkie pola", 4000);
        }
    }

    componentWillMount () {
        if( this.props.isLoggedIn )
            FlowRouter.go('Home');
    }

    render () {
        return (
            <div className="row">
                <h4>Logowanie</h4>
                <form className="col offset-s3 s6" onSubmit={this.onSubmit}>
                    <div className="input-field col s12">
                        <input type="text" placeholder="Nazwa użytkownika" ref="username" />
                    </div>
                    <div className="input-field col s12">
                        <input type="password" placeholder="Hasło" ref="password" />
                    </div>
                    <button className="waves-effect waves-light btn-large">Zaloguj</button>
                </form>
            </div>
        );
    }
}
