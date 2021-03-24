import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EditList from './edit-list';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <EditList />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
})