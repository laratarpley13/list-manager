import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
//import config from './config';
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
import tokenService from '../src/services/token-service';

class App extends Component {
  state = {
    token: "",
    user: {},
    lists: [],
    items: [],
  }

  /* In component did mount, with user that logged in, 
  get user information and corresponding lists and items, 
  and save to state
  */
  setLists = (newLists) => {
    console.log("set lists") //debugging
    this.setState({
      lists: newLists
    })
  }

  setItems = (newItems) => {
    console.log("set items") //debugging
    this.setState({
      items: newItems
    })
  }

  setUser = (newUser) => {
    console.log("set users") //debugging
    this.setState({
      user: newUser
    })
  }
  
  handleAuthToken = (setToken) => {
    this.setState({token: setToken})
  }

  toggleClass = (selectedItem) => {
    const currentState = selectedItem.active;
    //console.log(`https://mighty-taiga-07413.herokuapp.com/api/${this.state.user.id}/${selectedItem.listid}/${selectedItem.id}`)

    const toggleSelectedItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      listid: selectedItem.listid,
      userid: selectedItem.userid,
      active: !currentState,
      edititemactive: selectedItem.edititemactive
    }

    fetch(`https://mighty-taiga-07413.herokuapp.com/api/items/${this.state.user.id}/${selectedItem.listid}/${selectedItem.id}`, {
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

    console.log(tokenService.hasAuthToken)

    fetch(`https://mighty-taiga-07413.herokuapp.com/api/lists`, {
      method: 'POST',
      body: JSON.stringify(list),
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
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

    fetch(`https://mighty-taiga-07413.herokuapp.com/api/lists/${this.state.user.id}/${targetList.id}`, {
      method: 'PATCH',
      body: JSON.stringify(editedList),
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
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
      fetch(`https://mighty-taiga-07413.herokuapp.com/api/lists/${this.state.user.id}/${targetListId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
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
      fetch(`https://mighty-taiga-07413.herokuapp.com/api/items/${this.state.user.id}/${targetItem.listid}/${targetItem.id}`, {
        method: 'DELETE',
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
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

    fetch(`https://mighty-taiga-07413.herokuapp.com/api/items/${this.state.user.id}/${targetItem.listid}/${targetItem.id}`, {
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
    if (TokenService.getAuthToken()) {
      fetch(`https://mighty-taiga-07413.herokuapp.com/api/lists`, {
        method: 'GEt',
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`
        }
      }).then((listRes) => {
        if(!listRes.ok){
          return listRes.json().then(e => Promise.reject(e))
        }
        return listRes.json()
      }).then((listRes) => {
        this.setLists(listRes)
        fetch(`https://mighty-taiga-07413.herokuapp.com/api/items`, {
          method: 'GET',
          headers: {
            'authorization': `bearer ${tokenService.getAuthToken()}`
          }
        }).then((itemRes) => {
          if(!itemRes.ok){
            return itemRes.json().then(e => Promise.reject(e))
          }
          return itemRes.json()
        }).then((itemRes) => {
          this.setItems(itemRes)
          fetch(`https://mighty-taiga-07413.herokuapp.com/api/users`, {
            method: 'GET',
            headers: {
              'authorization': `bearer ${tokenService.getAuthToken()}`
            }
          }).then((userRes) => {
            if(!userRes.ok){
              return userRes.json().then(e => Promise.reject(e))
            }
            return userRes.json()
          }).then((userRes) => {
            this.setUser(userRes)
          })
        })
      })
    }
  }

  render() {
      const value = {
      token: this.state.token,
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
                setLists={this.setLists}
                setItems={this.setItems}
                setUser={this.setUser}
                handleAuthToken={this.handleAuthToken}
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
                    setLists={this.setLists}
                    setItems={this.setItems}
                    setUser={this.setUser}
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
