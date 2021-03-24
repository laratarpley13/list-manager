import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './sign-in';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
})