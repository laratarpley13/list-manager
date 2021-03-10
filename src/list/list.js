import React, { Component } from 'react';
import Context from '../Context';
import TokenService from '../services/token-service';
import './list.css';

export default class List extends Component {
    static contextType = Context;

    logout = () => {
        TokenService.clearAuthToken();
        this.props.history.push('/')
    }

    render() {
        const { user, lists, items } = this.context

        const targetUserId = parseInt(this.props.match.params.userId);
        console.log(targetUserId)
        const targetListId = parseInt(this.props.match.params.listId);
        let targetList = lists.filter(list => list.id === targetListId);
        targetList = targetList[0];

        return (
            <div>
                <nav>
                    <h3>List Manager</h3>
                    {(TokenService.hasAuthToken() && user.id === targetUserId)
                        ? <><button onClick={() => this.props.history.push('/dashboard')}>Dashboard</button>
                          <button onClick={() => this.logout()}>Log Out</button></>
                        : <><button onClick={() => this.props.history.push('/')}>Home</button></>
                    }
                </nav>
                <section className='list-info'>
                    <h1>{targetList.name}</h1>
                    <p>Date Created: {targetList.date}</p>
                    {(TokenService.hasAuthToken() && user.id === targetUserId)
                        ?   <div className="list-options">
                                <button onClick={() => this.props.history.push(`/edit-list/${targetListId}`)}>Edit List</button>
                                <button onClick={() => {
                                    this.props.history.push(`/dashboard`);
                                    this.props.handleDeleteList(targetListId);
                                }}>Delete List</button>
                            </div>
                        : null
                    }
                    {(TokenService.hasAuthToken() && user.id === targetUserId)
                        ?  <form className='add-item' onSubmit={e => {
                                this.props.handleItemAdd(e, targetListId);
                                e.target.reset();    
                            }}>
                                <h3>Add Item</h3>
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" required />
                                <br />
                                <button type="submit">Submit</button>
                            </form>
                        : null
                    }
                    <ul className="list-items">
                        {items.filter(item => item.listId === targetListId).map(filteredItem => 
                            <li key={filteredItem.id}>
                                <h4 className={filteredItem.active ? 'check-item': null}>{filteredItem.name}</h4>
                                {filteredItem.active
                                    ? <button onClick={() => this.props.toggleClass(filteredItem)}>Un-Check</button>
                                    : <button onClick={() => this.props.toggleClass(filteredItem)}>Check-Off</button>
                                }
                                {(TokenService.hasAuthToken() && user.id === targetUserId)
                                    ? <><button onClick={() => this.props.handleEditToggle(filteredItem)}>Edit</button>
                                      <button onClick={() => this.props.handleItemDelete(filteredItem.id)}>Delete</button></>
                                    : null
                                }
                                {filteredItem.editItemActive
                                    ?   <form onSubmit={e => {this.props.handleItemEdit(e, filteredItem)}}>
                                            <label htmlFor="name">Name:</label>
                                            <input type="text" id="name" name="name" defaultValue={filteredItem.name} />
                                            <br />
                                            <button type="submit">Submit</button>
                                        </form>
                                    :   null
                                }
                            </li>    
                        )}
                    </ul>
                    <button className='back-button' onClick={() => this.props.history.push('/dashboard')}>Back</button>
                </section>
            </div>
        )
    }
}