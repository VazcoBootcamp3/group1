import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

import ShoppingList from '/components/ShoppingList';
import Flatmates from '/components/Flatmates';
import Report from '/components/Report';

export default class extends React.Component {

    render() {
        return(
          <div>
              <Tabs>
                  <Tab
                      icon={<FontIcon className="material-icons">shopping_cart</FontIcon>}
                      label="SHOPPING LIST"
                  >
                      <div className="box">
                        <ShoppingList />
                      </div>
                  </Tab>

                  <Tab
                      icon={<FontIcon className="material-icons">group</FontIcon>}
                      label="FLATMATES"
                  >
                      <div className="box">
                      <Flatmates />
                          </div>
                  </Tab>

                  <Tab
                      icon={<FontIcon className="material-icons">equalizer</FontIcon>}
                      label="REPORT"
                  >
                      <Report />
                  </Tab>

              </Tabs>
          </div>
        );
    }
}