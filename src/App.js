import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Landing from '../src/landing-page/landing.js';
import SignUp from '../src/sign-up/sign-up.js';
import SignIn from '../src/sign-in/sign-in.js';
import CreateList from '../src/create-list/create-list.js';
import Dashboard from '../src/dashboard/dashboard.js';
import List from '../src/list/list.js';
import EditList from '../src/edit-list/edit-list.js'
import EditItem from '../src/edit-item/edit-item.js'

class App extends Component {
  render() {
    return (
      <main className='App'>
        <Route exact path='/' component={Landing} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/sign-in' component={SignIn} />
        <Route path='/create-list' component={CreateList} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/list' component={List} />
        <Route path='/edit-list' component={EditList} />
        <Route path='/edit-item' component={EditItem} />
      </main>
    );
  }
}

export default App;
