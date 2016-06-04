import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import CostItems from '../api/costItems';
import { Users } from '../api/users';

// import ShoppingSpree from './ShoppingSpree';
import AddNewItem from './AddNewItem';
import AddNewUser from './AddNewUser';
import User from './User';
import CostItem from './CostItem';
import Report from './Report';

class App extends Component {

  renderCostItems() {
    return this.props.costItems.map((item) => (<CostItem key={item._id} item = {item} />));
  }

  renderUsers() {
    return this.props.users.map((user) => (<User key = {user._id} user = {user} />));
  }

  handleListToggle(e) {

  }

  handlePayedItemsToggle(e) {

  }

  render() {
    return (
      <div className="container">
        <header className="header-title card-panel">
        <h1>Paweł i Gaweł w jednym stali domu...</h1>
        <h3>... czyli aplikacja ułatwiająca rozliczanie kosztów mieszkania razem :)</h3>
        </header>

        <AddNewItem />
        <div className="card-panel">
        <button className="btn report-toggle teal darken-4 waves-effect waves-light"
         onClick={e => this.handleListToggle(e)}>Raport</button>
         <button className="btn hide-payed teal darken-4 waves-effect waves-light"
          onClick={e => this.handlePayedItemsToggle(e)}>Ukryj zapłacone</button>
        </div>
        <div className="collection">
          {this.renderCostItems()}
        </div>
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
    users: Users.find({}).fetch(),
  };
}, App);
