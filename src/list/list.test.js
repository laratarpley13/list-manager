import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import List from './list';
import Context from '../Context';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const props = {
    match: {
      params: {
        listid: "1",
        userid: "1",
      }
    },
    history: {
      push: `/`
    }
  }  
  
  const user = {
    id: 1,
    email: "demo@demo.com"
  }

  const lists = [
    {
      id: 1,
      name: "Test List",
      userid: 1,
    },
    {
      id: 2,
      name: "Test List 2",
      userid: 1
    }
  ]

  const items = [
    {
      id: 1,
      name: 'Test Item',
      listid: 1,
      userid: 1,
      active: false,
      edititemactive: false,
    },
    {
      id: 2,
      name: 'Test Item 2',
      listid: 2,
      userid: 1,
      active: false,
      edititemactive: false,
    }
  ]

  const value = {
    user: user,
    lists: lists,
    items: items,
  }

  ReactDOM.render(
    <Context.Provider value={value}>
      <BrowserRouter>
        <List 
          {...props}
        />
      </BrowserRouter>
    </Context.Provider>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
})