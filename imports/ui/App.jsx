import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import CostItems from '../api/costItems';

import AddNewItem from './AddNewItem';
import User from './User';
import CostItem from './CostItem';
import Header from './Header';


class App extends Component {

  constructor(...args) {
      super(...args);
    }

  renderReport() {
    const loggedUser =  Meteor.user();
    if (loggedUser) {
      const loggedUserGroup = loggedUser.profile.group;
      let filteredUsers = this.props.users;
      filteredUsers = filteredUsers.filter(user => user.profile.group === loggedUserGroup);
      return filteredUsers.map((user) => (<CostItem key={user._id} user={user}/>));
    }
  }

  renderUsers() {
    const loggedUser =  Meteor.user();
    if (loggedUser) {
      const loggedUserGroup = loggedUser.profile.group;
      let filteredUsers = this.props.users;
      filteredUsers = filteredUsers.filter(user => user.profile.group === loggedUserGroup);
      return filteredUsers.map((user) => (<User key={user._id} user={user} />));
    }
  }

  renderInfoForAnonim() {
    if (!Meteor.user()) {
      return <div className="card-panel"><h3 className="red-text text-darken-2">Aby korzystać z aplikacji zaloguj się lub zarejestruj,
       jeśli nie masz jeszcze u nas konta.</h3></div>;
    }
  }

  handleListToggle(e) {
    e.preventDefault();
    $('.items-list').toggle();
  }

  render() {
    return (

      <div className="container">
      <Header />
      <AddNewItem />
      <div className="card-panel">
        <button className="btn report-toggle teal darken-4 waves-effect waves-light"
        onClick={e => this.handleListToggle(e)}>Raport</button>
        <button className="btn hide-payed teal darken-4 waves-effect waves-light right"
        onClick={e => this.handlePayedItemsToggle(e)}>Wszystkie</button>
      </div>
      <ul className="items-list collapsible" data-collapsible="accordion">
          {this.renderReport()}
      </ul>
      <div className="card-panel"><strong>Współlokatorzy: </strong>{this.renderUsers()}</div>
    </div>
  )
  }
}


App.propTypes = {
  costItems: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

Meteor.users.deny({
  update: function() {
    return true;
  }
});

export default createContainer(() => {
  return {
    costItems: CostItems.find({}, {createdAt: -1}).fetch(),
    users: Meteor.users.find({}).fetch(),
  };
}, App);
