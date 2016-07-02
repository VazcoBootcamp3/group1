import React from 'react/react';

export const GroupJoin = (props) => {
    return (
        <div className="row">
            <h4>Utwórz lub dołącz do grupy</h4>
            <form className="col offset-s3 s6" onSubmit={props.functions.createOrJoinGroup}>
                <div className="input-field col s12">
                    <input type="text" placeholder="Nazwa grupy" name="groupName" />
                </div>
                <button className="waves-effect waves-light btn-large">Utwórz lub Dołącz</button>
            </form>
        </div>
    );
};