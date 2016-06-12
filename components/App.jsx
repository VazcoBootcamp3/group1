// main
import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';

// material-ui
import FontIcon from 'material-ui/FontIcon';
import {Tabs, Tab} from 'material-ui/Tabs';

// components
import ShoppingList from '/components/ShoppingList';
import Flatmates from '/components/Flatmates';
import Report from '/components/Report';


const menuForMembers = [
  {label: 'SHOPPING LIST',  icon: 'shopping_cart',  component: <ShoppingList />},
  {label: 'FLATMATES',      icon: 'group',          component: <Flatmates />},
  {label: 'REPORT',         icon: 'equalizer',      component: <Report />},
  {label: 'CHAT',           icon: 'chat',           component: ''},
  {label: 'YOUR ACCOUNT',   icon: 'account_box',    component: ''},    
];

const menuForGuest = [
  {label: 'LOG IN',         icon: 'group',          component: ''},
  {label: 'REGISTER',       icon: 'group',          component: ''},
];

export default class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        menu: this.props.currentUser ? menuForMembers : menuForGuest,
      };
    }

    render() {
        return(
          <div>
              <Tabs>
                  {this.state.menu.map((item) => (
                    <Tab icon={<FontIcon className="material-icons">{item.icon}</FontIcon>} label={item.label}>{item.component}</Tab>                    
                  ))}
              </Tabs>
          </div>
        );
    }
}

App.propTypes = {
};

export default createContainer(() => {
  return{
    currentUser: 'michal',
  };
}, App);