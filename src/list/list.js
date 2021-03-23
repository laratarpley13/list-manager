import React, { Component } from 'react';
//import config from '../config';
import Context from '../Context';
import TokenService from '../services/token-service';
import './list.css';

export default class List extends Component {
   static contextType = Context;

   state = {
       list: {
           id: '',
           name: '',
           userid: '',
           date: '',
       },
       items: []
   }

   checkItem = (selectedItem) => {
        const currentState = selectedItem.active;
        const toggleSelectedItem = {
            id: selectedItem.id,
            name: selectedItem.name,
            listid: selectedItem.listid,
            userid: selectedItem.userid,
            active: !currentState,
            edititemactive: selectedItem.edititemactive
        }

       if (this.context.user.id === parseInt(this.props.match.params.userId)) {
           console.log('handled in app component'); //debugging
           this.context.toggleClass(selectedItem);
           
           this.setState({
               items: this.state.items.map(item => 
                (item.id !== selectedItem.id) ? item : toggleSelectedItem)
           })
       } else {
           console.log('handled in list component'); //debugging
           fetch(`https://mighty-taiga-07413.herokuapp.com/api/items/${selectedItem.userid}/${selectedItem.listid}/${selectedItem.id}`, {
               method: 'PATCH',
               body: JSON.stringify(toggleSelectedItem),
               headers: {
                   'content-type': 'application/json'
               }
           })
               .then(res => {
                   if(!res.ok) {
                       return res.json().then(error => { throw error })
                   }
               })
               .then(() => {
                   this.setState({
                       items: this.state.items.map(item => 
                        (item.id !== selectedItem.id) ? item : toggleSelectedItem)
                   })
               })
               .catch(error => {
                   console.error({error})
               })
       }
   }

   toggleEdit = (selectedItem) => {
       const currentState = selectedItem.edititemactive

       const toggleSelectedItem = {
           id: selectedItem.id,
           name: selectedItem.name,
           listid: selectedItem.listid,
           active: selectedItem.active,
           edititemactive: !currentState
       }

       this.setState({
           items: this.state.items.map(item => 
            (item.id !== selectedItem.id) ? item : toggleSelectedItem)
       })
   }

   itemAdd = (e, newListId) => {
       e.preventDefault();

       const newItemName = e.target.name.value.trim();

       const item = {
           name: newItemName,
           listid: newListId,
           userid: this.context.user.id
       }

       fetch('https://mighty-taiga-07413.herokuapp.com/api/items/', {
           method: 'POST',
           body: JSON.stringify(item),
           headers: {
               'authorization': `bearer ${this.context.token}`,
               'content-type' : 'application/json',
           }
       })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => {
                        throw error
                    })
                }
                return res.json()
            })
            .then(data => {
                console.log(data) //debugging
                this.context.handleItemAdd(data)
                this.setState({
                    items: [...this.state.items, data]
                })
            })
            .catch(error => {
                console.error({error})
            })
   }

   itemEdit = (e, selectedItem) => {
        e.preventDefault();
        this.context.handleItemEdit(e, selectedItem)

        const editedName = e.target.name.value.trim()
        const editedItem = {
            id: selectedItem.id,
            name: editedName,
            listid: selectedItem.listid,
            userid: selectedItem.userid,
            active: false,
            edititemactive: false,
        }

        this.setState({
            items: this.state.items.map(item => 
                (item.id !== selectedItem.id) ? item : editedItem)
        })
   }

    itemDelete = (selectedItem) => {
        this.context.handleItemDelete(selectedItem)
        const newItems = this.state.items.filter(item => 
            item.id !== selectedItem.id
        )

        this.setState({ items: newItems })
    }

    logout = () => {
        TokenService.clearAuthToken();
        this.props.history.push('/')
    }

    componentDidMount() {
        Promise.all([
            fetch(`https://mighty-taiga-07413.herokuapp.com/api/lists/${this.props.match.params.userId}/${this.props.match.params.listId}`),
            fetch(`https://mighty-taiga-07413.herokuapp.com/api/items/${this.props.match.params.userId}`)
        ])
            .then(([listsRes, itemsRes]) => {
                if(!listsRes.ok)
                    return listsRes.json().then(e => Promise.reject(e));
                if(!itemsRes.ok)
                    return itemsRes.json().then(e => Promise.reject(e));

                return Promise.all([listsRes.json(), itemsRes.json()])
            })
            .then(([list, items]) => {
                this.setState({
                    list: list,
                    items: items
                })
                console.log(list);
                console.log(items);
            })
    }

    render() {
        const { user } = this.context

        const targetUserId = parseInt(this.props.match.params.userId);
        const targetListId = parseInt(this.props.match.params.listId);
        const targetList = this.state.list;
        console.log(targetList.date)

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
                    <p>Date Created: {targetList.date.split("T")[0]}</p>
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
                                this.itemAdd(e, targetListId);
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
                        {this.state.items.filter(item => item.listid === targetListId).map(filteredItem => 
                            <li key={filteredItem.id}>
                                <h4 className={filteredItem.active ? 'check-item': null}>{filteredItem.name}</h4>
                                {filteredItem.active && !filteredItem.edititemactive
                                    ? <button onClick={() => this.checkItem(filteredItem)}><i className="fas fa-check-square"></i>Un-Check</button>
                                    : <button onClick={() => this.checkItem(filteredItem)}><i className="fas fa-check-square"></i>Check-Off</button>
                                }
                                {(TokenService.hasAuthToken() && user.id === targetUserId && !filteredItem.edititemactive)
                                    ? <><button onClick={() => this.toggleEdit(filteredItem)}><i className="fas fa-edit"></i>Edit</button>
                                      <button onClick={() => this.itemDelete(filteredItem)}><i className="fas fa-trash-alt"></i>Delete</button></>
                                    : null
                                }
                                {filteredItem.edititemactive
                                    ?   <form onSubmit={e => {this.itemEdit(e, filteredItem)}}>
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