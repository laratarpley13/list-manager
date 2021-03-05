import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Context from './Context';
import Landing from '../src/landing-page/landing.js';
import SignUp from '../src/sign-up/sign-up.js';
import SignIn from '../src/sign-in/sign-in.js';
import CreateList from '../src/create-list/create-list.js';
import Dashboard from '../src/dashboard/dashboard.js';
import List from '../src/list/list.js';
import EditList from '../src/edit-list/edit-list.js'
import EditItem from '../src/edit-item/edit-item.js'

class App extends Component {
  state = {
    lists: [
      {
        id: 1,
        name: 'List 1',
        description: 'Test List 1',
        date: '01/01/2021',
      },
      {
        id: 2,
        name: 'List 2',
        description: 'Test List 2',
        date: '02/02/2021',
      },
      {
        id: 3,
        name: 'List 3',
        description: 'Test List 3',
        date: '03/03/2023',
      },
    ],
    items: [
      {
        id: 1,
        name: 'Item  1',
        description: 'test item 1',
        listId: 1,
        active: false
      },
      {
        id: 2,
        name: 'Item  2',
        description: 'test item 2',
        listId: 1,
        active: false
      },
      {
        id: 3,
        name: 'Item  3',
        description: 'test item 3',
        listId: 1,
        active: false
      },
      {
        id: 4,
        name: 'Item  4',
        description: 'test item 4',
        listId: 2,
        active: false
      },
      {
        id: 5,
        name: 'Item  5',
        description: 'test item ',
        listId: 2,
        active: false
      },
      {
        id: 6,
        name: 'Item  6',
        description: 'test item 6',
        listId: 2,
        active: false
      },
      {
        id: 7,
        name: 'Item  7',
        description: 'test item 7',
        listId: 3,
        active: false
      },
      {
        id: 8,
        name: 'Item  8',
        description: 'test item 8',
        listId: 3,
        active: false
      },
      {
        id: 9,
        name: 'Item  9',
        description: 'test item 9',
        listId: 3,
        active: false
      }
    ],
  }

  handleListAdd = (e) => {
    e.preventDefault();
    const newListName = e.target.name.value.trim();
    const newListDescription = e.target.description.value.trim();
    //create date added
    let today = new Date();
    let dateAdded = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
    //create new id
    let last = this.state.lists[this.state.lists.length - 1];
    const newListId = last.id + 1;
    
    const list = {
      id: newListId,
      name: newListName,
      description: newListDescription,
      date: dateAdded,
    }

    this.setState(
      {
        lists: [...this.state.lists, list]
      }
    )
  }

  handleItemAdd = (e, newListId) => {
    e.preventDefault();
  
    const newItemName = e.target.name.value.trim();
    const newItemDescription = e.target.description.value.trim();
    //create new item id
    let last = this.state.items[this.state.items.length - 1];
    const newItemId = last.id + 1;

    const item = {
      id: newItemId,
      name: newItemName,
      description: newItemDescription,
      listId: newListId,
      active: false
    }

    this.setState({
      items: [...this.state.items, item]
    })
  }

  handleListEdit = (e, targetListId) => {
    e.preventDefault();
    const editedName = e.target.name.value.trim();
    const editedDescription = e.target.description.value.trim();
    //create date last edited
    let today = new Date();
    let dateEdited = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();

    const editedList = {
      id: targetListId,
      name: editedName,
      description: editedDescription,
      date: dateEdited,
    }

    this.setState({
      lists: this.state.lists.map(list => 
        (list.id !== editedList.id) ? list : editedList)
    })
  }

  handleDeleteList = (targetListId) => {
    const newLists = this.state.lists.filter(list => 
      list.id !== targetListId
    )

    const newItems = this.state.items.filter(item => 
      item.listId !== targetListId
    )

    this.setState({
      lists: newLists
    })
    this.setState({
      items: newItems
    })
  }

  handleItemDelete = (targetItemId) => {
    const newItems = this.state.items.filter(item => 
      item.id !== targetItemId
    )
    this.setState({
      items: newItems
    })
  }

  handleItemEdit = (e, targetItem) => {
    e.preventDefault();
    const editedName = e.target.name.value.trim();
    const editedDescription = e.target.description.value.trim();

    const editedItem = {
      id: targetItem.id,
      name: editedName,
      description: editedDescription,
      listId: targetItem.listId,
      active: false
    }

    this.setState({
      items: this.state.items.map(item => 
        (item.id !== editedItem.id) ? item : editedItem)
    })
  }

  render() {
    const value = {
      lists: this.state.lists,
      items: this.state.items,
    }
    return (
      <Context.Provider value={value}>
        <main className='App'>
          <Route exact path='/' 
            render={(props) => 
              <Landing
                {...props}
              />
            } 
          />
          <Route path='/sign-up' 
            render={(props) => 
              <SignUp 
                {...props}
              />
            } 
          />
          <Route path='/sign-in' 
            render={(props) => 
              <SignIn 
                {...props}
              />
            } 
          />
          <Route path='/create-list' 
            render={(props) => 
              <CreateList
                {...props}
                handleListAdd={this.handleListAdd}
              />
            } 
          />
          <Route 
            path='/dashboard' 
            render={(props) => 
              <Dashboard 
                {...props}
              />
            } 
          />
          <Route 
            path='/list/:listId' 
            render={(props) => 
              <List 
                {...props}
                handleItemAdd={this.handleItemAdd}
                handleDeleteList={this.handleDeleteList}
                handleItemDelete={this.handleItemDelete}
              />
            } 
          />
          <Route path='/edit-list/:listId' 
            render={(props) => 
              <EditList
                {...props}
                handleListEdit = {this.handleListEdit}
              />
            } 
          />
          <Route path='/edit-item/:itemId' 
            render={(props) => 
              <EditItem
                {...props}
                handleItemEdit={this.handleItemEdit}
              />
            } 
          />
        </main>
      </Context.Provider>
    );
  }
}

export default App;
