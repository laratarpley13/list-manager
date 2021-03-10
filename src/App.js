import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../src/services/token-service';
import './App.css';
import Context from './Context';
import Landing from '../src/landing-page/landing.js';
import SignUp from '../src/sign-up/sign-up.js';
import SignIn from '../src/sign-in/sign-in.js';
import CreateList from '../src/create-list/create-list.js';
import Dashboard from '../src/dashboard/dashboard.js';
import List from '../src/list/list.js';
import EditList from '../src/edit-list/edit-list.js';
import EditItem from '../src/edit-item/edit-item.js';

class App extends Component {
  state = {
    lists: [
      {
        id: 1,
        name: 'List 1',
        date: '01/01/2021',
      },
      {
        id: 2,
        name: 'List 2',
        date: '02/02/2021',
      },
      {
        id: 3,
        name: 'List 3',
        date: '03/03/2020',
      },
    ],
    items: [
      {
        id: 1,
        name: 'Item  1',
        listId: 1,
        active: false
      },
      {
        id: 2,
        name: 'Item  2',
        listId: 1,
        active: false
      },
      {
        id: 3,
        name: 'Item  3',
        listId: 1,
        active: false
      },
      {
        id: 4,
        name: 'Item  4',
        listId: 2,
        active: false
      },
      {
        id: 5,
        name: 'Item  5',
        listId: 2,
        active: false
      },
      {
        id: 6,
        name: 'Item  6',
        listId: 2,
        active: false
      },
      {
        id: 7,
        name: 'Item  7',
        listId: 3,
        active: false
      },
      {
        id: 8,
        name: 'Item  8',
        listId: 3,
        active: false
      },
      {
        id: 9,
        name: 'Item  9',
        listId: 3,
        active: false
      }
    ],
  }

  toggleClass = (selectedItem) => {
    const currentState = selectedItem.active;

    const toggleSelectedItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      listId: selectedItem.listId,
      active: !currentState
    }

    this.setState({
      items: this.state.items.map(item => 
        (item.id !== selectedItem.id) ? item : toggleSelectedItem)
    })
  }

  handleListAdd = (e) => {
    e.preventDefault();
    const newListName = e.target.name.value.trim();
    //create date added
    let today = new Date();
    let dateAdded = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
    //create new id
    let last = this.state.lists[this.state.lists.length - 1];
    const newListId = last.id + 1;
    
    const list = {
      id: newListId,
      name: newListName,
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
    //create new item id
    let last = this.state.items[this.state.items.length - 1];
    const newItemId = last.id + 1;

    const item = {
      id: newItemId,
      name: newItemName,
      listId: newListId,
      active: false
    }

    this.setState({
      items: [...this.state.items, item]
    })
  }

  handleListEdit = (e, targetList) => {
    e.preventDefault();
    const editedName = e.target.name.value.trim();

    const editedList = {
      id: targetList.id,
      name: editedName,
      date: targetList.date,
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

    const editedItem = {
      id: targetItem.id,
      name: editedName,
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
          <Route 
            path={'/create-list'}
            render={(props) => (
              TokenService.hasAuthToken
                ? <CreateList
                    {...props}
                    handleListAdd={this.handleListAdd}
                  />
                : <Redirect 
                    to={{
                      pathname: '/sign-in',
                      state: { from: props.location }
                    }}
                  />
            )} 
          />
          <Route 
            path={'/dashboard'}
            render={(props) => (
              TokenService.hasAuthToken()
                ? <Dashboard 
                    {...props}
                  />
                : <Redirect 
                    to={{
                      pathname: '/sign-in',
                      state: { from: props.location }
                    }}
                  />
            )} 
          />
          <Route 
            path={'/list/:listId'} 
            render={(props) => (
              TokenService.hasAuthToken()
                ? <List 
                    {...props}
                    handleItemAdd={this.handleItemAdd}
                    handleDeleteList={this.handleDeleteList}
                    handleItemDelete={this.handleItemDelete}
                    toggleClass={this.toggleClass}
                  />
                : <Redirect 
                    to={{
                      pathname: '/sign-in',
                      state: { from: props.location }
                    }}
                  />
            )}
          />
          <Route 
            path={'/edit-list/:listId'} 
            render={(props) => (
              TokenService.hasAuthToken()
                ?  <EditList
                    {...props}
                    handleListEdit = {this.handleListEdit}
                  />
                : <Redirect 
                    to={{
                      pathname: '/sign-in',
                      state: { from: props.location }
                    }}
                  />
            )} 
          />
          <Route 
            path={'/edit-item/:itemId'}
            render={(props) => ( 
              TokenService.hasAuthToken()
                ?  <EditItem
                    {...props}
                    handleItemEdit={this.handleItemEdit}
                  />
                : <Redirect 
                    to={{
                      pathname: '/sign-in',
                      state: { from: props.location }
                    }}
                  />
            )}
          />
        </main>
      </Context.Provider>
    );
  }
}

export default App;
