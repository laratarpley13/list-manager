import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import config from './config';
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
    lists: [],
    items: [],
  }

  /* In component did mount, with user that logged in, 
  get user information and corresponding lists and items, 
  and save to state
  */

  toggleClass = (selectedItem) => {
    const currentState = selectedItem.active;
    console.log(config.API_BASE_URL + `items/${this.state.user.id}/${selectedItem.listid}/${selectedItem.id}`)

    const toggleSelectedItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      listid: selectedItem.listid,
      userid: selectedItem.userid,
      active: !currentState,
      edititemactive: selectedItem.edititemactive
    }

    fetch(config.API_BASE_URL + `items/${this.state.user.id}/${selectedItem.listid}/${selectedItem.id}`, {
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

  handleListAdd = (e) => {
    e.preventDefault();
    const newListName = e.target.name.value.trim();
    const list = {
      name: newListName,
      userid: this.state.user.id,
    }

    fetch(config.API_BASE_URL + `lists`, {
      method: 'POST',
      body: JSON.stringify(list),
      headers: {
        'content-type': 'application/json'
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
        console.log(data)
        this.setState({
          lists: [...this.state.lists, data]
        })
      })
      .catch(error => {
        console.error({error})
      })
  }

  handleItemAdd = (newItem) => {
    console.log('test'); //debugging

    this.setState({
      items: [...this.state.items, newItem]
    })
  }

  handleListEdit = (e, targetList) => {
    e.preventDefault();
    const editedName = e.target.name.value.trim();

    const editedList = {
      id: targetList.id,
      name: editedName,
      data: targetList.date,
      userid: targetList.userid
    }

    fetch(config.API_BASE_URL + `lists/${this.state.user.id}/${targetList.id}`, {
      method: 'PATCH',
      body: JSON.stringify(editedList),
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
          lists: this.state.lists.map(list => 
            (list.id !== editedList.id) ? list : editedList)
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  handleDeleteList = (targetListId) => {
    const newLists = this.state.lists.filter(list => 
      list.id !== targetListId
    )

    this.setState({ lists: newLists }, () => {
      fetch(config.API_BASE_URL + `lists/${this.state.user.id}/${targetListId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => res)
      .catch(error => {
        console.error({error});
      })
    })
  }

  handleItemDelete = (targetItem) => {
    console.log('handle delete item in app component'); //debugging
    const newItems = this.state.items.filter(item => 
      item.id !== targetItem.id
    )
    this.setState({ items: newItems }, () => {
      fetch(config.API_BASE_URL + `items/${this.state.user.id}/${targetItem.listid}/${targetItem.id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      }).then(res => res)
      .catch(error => {
        console.error({error});
      })
    })
  }

  handleItemEdit = (e, targetItem) => {
    e.preventDefault();
    const editedName = e.target.name.value.trim();

    const editedItem = {
      id: targetItem.id,
      name: editedName,
      listid: targetItem.listid,
      userid: targetItem.userid,
      active: false,
      edititemactive: false,
    }

    fetch(config.API_BASE_URL + `items/${this.state.user.id}/${targetItem.listid}/${targetItem.id}`, {
      method: 'PATCH',
      body: JSON.stringify(editedItem),
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
            (item.id !== editedItem.id) ? item : editedItem)
        })
      })
  }

  componentDidMount() {
    Promise.all([
      fetch(config.API_BASE_URL + `lists/${this.state.user.id}`),
      fetch(config.API_BASE_URL + `items/${this.state.user.id}`)
    ])
      .then(([listsRes, itemsRes]) => {
        if (!listsRes.ok)
          return listsRes.json().then(e => Promise.reject(e));
        if (!itemsRes.ok)
          return itemsRes.json().then(e => Promise.reject(e));

        return Promise.all([listsRes.json(), itemsRes.json()])
      })
      .then(([lists, items]) => {
        this.setState({lists, items});
        console.log(items)
      })
      .catch(error => {
        console.error({error});
      })
  }

  render() {
      const value = {
      user: this.state.user,
      lists: this.state.lists,
      items: this.state.items,
      toggleClass: this.toggleClass,
      handleItemEdit: this.handleItemEdit,
      handleItemAdd: this.handleItemAdd,
      handleItemDelete: this.handleItemDelete, 
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
