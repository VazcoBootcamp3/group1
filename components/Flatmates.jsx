import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List,ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

const users = [
    {'name': 'Alibaba', 'avatar': 'http://material-ui.com/images/uxceo-128.jpg'},
    {'name': 'Shrek', 'avatar': 'https://cdn1.iconfinder.com/data/icons/smashicons-movies-yellow/61/75_-Shrek-_Yellow-128.png'},
    {'name': 'Pikachu', 'avatar': 'http://cdn-img.easyicon.net/png/5792/579263.gif'},
];

export default class extends React.Component {

    render() {
        return(
          <div>
              <List>
                  {users.map((value, key) => (
                  <ListItem
                      disabled={true}
                      leftAvatar={<Avatar src={value.avatar} />}
                  >
                      {value.name}
                  </ListItem>
                  ))}

                  <ListItem
                      leftAvatar={<IconButton iconClassName="material-icons">add</IconButton>}
                  >
                      Add new person...
                  </ListItem>

              </List>
          </div>
        );
    }
}