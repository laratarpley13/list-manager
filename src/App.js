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

class App extends Component {
  state = {
    user: {
        id: 1,
        username: 'demo@demo.com',
        password: 'P@ssword1234',
    },
    lists: [
      {
        id: 1,
        name: 'List 1',
        date: '01/01/2021',
        userId: 1,
      },
      {
        id: 2,
        name: 'List 2',
        date: '02/02/2021',
        userId: 1,
      },
      {
        id: 3,
        name: 'List 3',
        date: '03/03/2020',
        userId: 1,
      },
    ],
    items: [
      {
        id: 1,
        name: 'Item  1',
        listId: 1,
        userId: 1,
        active: false,
        editItemActive: false,
      },
      {
        id: 2,
        name: 'Item  2',
        listId: 1,
        userId: 1,
        active: false,
        editItemActive: false,
      },
      {
        id: 3,
        name: 'Item  3',
        listId: 1,
        userId: 1,
        active: false,
        editItemActive: false,
      },
      {
        id: 4,
        name: 'Item  4',
        listId: 2,
        userId: 1,
        active: false,
        editItemActive: false,
      },
      {
        id: 5,
        name: 'Item  5',
        listId: 2,
        userId: 1,
        active: false,
        editItemActive: false,
      },
      {
        id: 6,
        name: 'Item  6',
        listId: 2,
        userId: 1,
        active: false,
        editItemActive: false,
      },
      {
        id: 7,
        name: 'Item  7',
        listId: 3,
        userId: 1,
        active: false,
        editItemActive: false,
      },
      {
        id: 8,
        name: 'Item  8',
        listId: 3,
        userId: 1,
        active: false,
        editItemActive: false,
      },
      {
        id: 9,
        name: 'Item  9',
        listId: 3,
        userId: 1,
        active: false,
        editItemActive: false,
      }
    ],
  }

  /* In component did mount, with user that logged in, 
  get user information and corresponding lists and items, 
  and save to state
  */

  toggleClass = (selectedItem) => {
    const currentState = selectedItem.active;

    const toggleSelectedItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      listId: selectedItem.listId,
      active: !currentState,
      editItemActive: selectedItem.editItemActive,
    }

    this.setState({
      items: this.state.items.map(item => 
        (item.id !== selectedItem.id) ? item : toggleSelectedItem)
    })

    // patch request to api
  }

  handleEditToggle = (selectedItem) => {
    const currentState = selectedItem.editItemActive;

    const toggleSelectedItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      listId: selectedItem.listId,
      active: selectedItem.active,
      editItemActive: !currentState,
    }

    this.setState({
      items: this.state.items.map(item => 
        (item.id !== selectedItem.id) ? item : toggleSelectedItem)
    })

    //patch request to api
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

    //post request to api
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
      active: false,
      editItemActive: false,
    }

    this.setState({
      items: [...this.state.items, item]
    })

    //post request to api
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

    //patch request to api
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

    //delete request to api
  }

  handleItemDelete = (targetItemId) => {
    const newItems = this.state.items.filter(item => 
      item.id !== targetItemId
    )
    this.setState({
      items: newItems
    })

    //delete request to api
  }

  handleItemEdit = (e, targetItem) => {
    e.preventDefault();
    const editedName = e.target.name.value.trim();

    const editedItem = {
      id: targetItem.id,
      name: editedName,
      listId: targetItem.listId,
      active: false,
      editItemActive: false,
    }

    this.setState({
      items: this.state.items.map(item => 
        (item.id !== editedItem.id) ? item : editedItem)
    })

    //patch request to api
  }

  render() {
    const value = {
      user: this.state.user,
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
            path={'/list/:userId/:listId'} 
            render={(props) =>
              <List 
                {...props}
                handleItemAdd={this.handleItemAdd}
                handleDeleteList={this.handleDeleteList}
                handleItemDelete={this.handleItemDelete}
                toggleClass={this.toggleClass}
                handleEditToggle={this.handleEditToggle}
                handleItemEdit={this.handleItemEdit}
              />
            }
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
        </main>
      </Context.Provider>
    );
  }
}

export default App;
