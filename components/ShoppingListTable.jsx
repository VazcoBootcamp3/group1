import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';

const tmp = [
    {'name': 'Alibaba', 'products': '40 rozbojnikow', 'date': '2016-06-06', 'totalCost': '40000'},
    {'name': 'Pikachu', 'products': 'pokeball', 'date': '2016-06-05', 'totalCost': '10'},
    {'name': 'Turtle', 'products': 'skorupa, butelka wody', 'date': '2016-06-04', 'totalCost': '53.11'},
    {'name': 'Yogi', 'products': 'koszyk wiklinowy', 'date': '2016-06-03', 'totalCost': '70'},
    {'name': 'Jack Sparrow', 'products': 'krople do oczu', 'date': '2016-06-02', 'totalCost': '23.50'},
    {'name': 'Kubus Puchatek', 'products': 'miod', 'date': '2016-06-01', 'totalCost': '16.20'},
    {'name': 'Nemo', 'products': 'akwarium', 'date': '2016-06-01', 'totalCost': '149.99'},
];


export default class extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            showCheckboxes: false
        };
    }

    render() {
        return(
          <Table>
              <TableHeader
                  adjustForCheckbox={this.state.showCheckboxes}
                  displaySelectAll={this.state.showCheckboxes}
              >
                  <TableRow>
                      <TableHeaderColumn>NAME</TableHeaderColumn>
                      <TableHeaderColumn>PRODUCTS</TableHeaderColumn>
                      <TableHeaderColumn>DATE</TableHeaderColumn>
                      <TableHeaderColumn>TOTAL COST</TableHeaderColumn>
                      <TableHeaderColumn></TableHeaderColumn>
                  </TableRow>
              </TableHeader>

              <TableBody
                displayRowCheckbox={this.state.showCheckboxes}
              >

                      {tmp.map((value, key) => (
                          <TableRow>
                              <TableRowColumn>{value.name}</TableRowColumn>
                              <TableRowColumn>{value.products}</TableRowColumn>
                              <TableRowColumn>{value.date}</TableRowColumn>
                              <TableRowColumn>{value.totalCost}</TableRowColumn>
                              <TableRowColumn style={{textAlign: 'right'}}>
                                  <IconButton
                                      iconClassName="material-icons"
                                  >done</IconButton>

                                  <IconButton
                                      iconClassName="material-icons"
                                  >mode_edit</IconButton>

                                  <IconButton
                                      iconClassName="material-icons"
                                  >delete</IconButton>
                              </TableRowColumn>
                          </TableRow>
                          ))}


              </TableBody>

          </Table>
        );
    }
}