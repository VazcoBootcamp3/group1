import React from 'react';

export default class extends React.Component {
    constructor (...args) {
        super(...args);
        this.state = {
            shopping_list: this.props.shopping_list,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    changeStatus (id) {
        for(let i in this.state.shopping_list) {
            if(id === this.state.shopping_list[i].id) {

                let list = this.state.shopping_list;
                list[i].paid = !list[i].paid;

                this.setState({
                    shopping_list: list,
                })

                localStorage.setItem('shopping_list', JSON.stringify(list));
            }
        }
    }

    render () {
        return (
            <table>
            <thead>
                <tr>
                    <th>Kupujący</th>
                    <th>Dłużny</th>
                    <th>Kwota</th>
                    <th>Lista zakupów</th>
                    <th>Uregulowano?</th>
                </tr>
            </thead>
            <tbody>
                {this.state.shopping_list.map(
                    (r, i) => {
                        return <tr key={i}>
                                    <td>{r.buyer}</td>
                                    <td>{r.indebted}</td>
                                    <td>{r.price}</td>
                                    <td>{r.products}</td>
                                    <td>
                                    <input type="checkbox"
                                    checked=
                                        {((r)=>{
                                            if(r) {
                                                return "checked";
                                            } else {
                                                return "";
                                            }
                                        })(r.paid)}
                                    onChange={this.changeStatus.bind(this, r.id)}

                                    />
                                    </td>
                                </tr>;
                    }
                )}
            </tbody>
            </table>
        );
    }
}