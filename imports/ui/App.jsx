// main
import React, {PropTypes} from 'react';
import {createContainer}  from 'meteor/react-meteor-data';
import {Meteor}           from 'meteor/meteor';

// material-ui
import FontIcon     from 'material-ui/FontIcon';
import {Tabs, Tab}  from 'material-ui/Tabs';

// components
import ShoppingList from '/imports/ui/ShoppingList';
import Report       from '/imports/ui/Report';
import Item         from '/imports/ui/Item';
import Login        from '/imports/ui/Login';
import AccountsUIWrapper from '/imports/ui/AccountsUIWrapper';

// mongo
import {Items}      from '/imports/api/items.js';




class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        menu: this.props.currentUser ? this._renderMenuForMembers.bind(this) : this._renderMenuForGuests.bind(this),
      };      
    }

    _renderMenuForMembers() {
      return(
        <Tabs>
          <Tab icon={<FontIcon className="material-icons">shopping_cart</FontIcon>} 
               label="SHOPPING LIST">
               <ShoppingList items={this.props.items} users={this.props.users} />
          </Tab>
          <Tab icon={<FontIcon className="material-icons">equalizer</FontIcon>} 
               label="REPORT">
               <Report />
          </Tab>
          <Tab icon={<FontIcon className="material-icons">chat</FontIcon>} 
               label="CHAT">
          </Tab>
          <Tab icon={<FontIcon className="material-icons">account_box</FontIcon>} 
               label="YOUR ACCOUNT">
          </Tab>          
        </Tabs>
      );
    }

    _renderMenuForGuests() {
      return(
        <Tabs>
          <Tab icon={<FontIcon className="material-icons">group</FontIcon>} 
               label="LOG IN">
               <Login />
          </Tab>
          <Tab icon={<FontIcon className="material-icons">group</FontIcon>} 
               label="REGISTER">
          </Tab>
        </Tabs>
      );  
    }    

    render() {
      return(
        <div>
          <AccountsUIWrapper />
          {this.state.menu()}
        </div>
      );
    }
}

App.propTypes = {
  users: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return{
    currentUser: "michal",
    items: Items.find({}, { sort: { date: -1 } }).fetch(),
    users: Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch(),
  };
}, App);