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
    let filteredItems = this.props.costItems;
    if (this.state.hidePayedItems) {
      filteredItems = filteredItems.filter(item => !item.isPayed);
    }
    return filteredItems.map((item) => (<CostItem key={item._id} item={item} />));
  }

  renderUsers() {
    return this.props.users.map((user) => (<User key={user._id} user={user} />));
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
        <header className="header-title card-panel">
        <h1><img height="70" width="70"
        src="https://api.icons8.com/download/16e39063cf7f72a497ae57d67086817378c225d4/Android_L/PNG/256/Very_Basic/home-256.png" />
        Paweł i Gaweł w jednym stali domu...</h1>
        <h3>... czyli aplikacja ułatwiająca rozliczanie kosztów mieszkania razem :)</h3>
        </header>

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
        <AddNewUser users={this.props.users} />

        <div className="card-panel"><strong>Współlokatorzy: </strong>{this.renderUsers()}</div>
        </div>
    )
  }
}


App.propTypes = {
  costItems: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    costItems: CostItems.find({}, {createdAt: -1}).fetch(),
    users: FlatMates.find({}).fetch(),
  };
}, App);
