import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import CostItems from '../api/costItems';
import { FlatMates } from '../api/users';

import AddNewItem from './AddNewItem';
import AddNewUser from './AddNewUser';
import User from './User';
import CostItem from './CostItem';
import Header from './Header';


class App extends Component {

  constructor(...args) {
      super(...args);
      this.state = {
        hidePayedItems: true,
      };
    }

  renderCostItems() {
    const user =  Meteor.user();
    if (user) {
      const loggedUserGroup = user.profile.group;
      let filteredItems = this.props.costItems;
      filteredItems = filteredItems.filter(item => item.group !== this.loggedUserGroup);
      if (this.state.hidePayedItems) {
        filteredItems = filteredItems.filter(item => !item.isPayed);
      }
      return filteredItems.map((item) => (<CostItem key={item._id} item={item} />));
    }
  }

  renderUsers() {
    return this.props.users.map((user) => (<User key={user._id} user={user} />));
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
    $('.hide-payed').toggle();
  }

  handlePayedItemsToggle(e) {
    this.setState({
        hidePayedItems: !this.state.hidePayedItems,
      });
    // $('.items-list').toggle();
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
          {this.renderCostItems()}
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
