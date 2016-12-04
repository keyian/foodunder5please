import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router'

import App from './components/App';
import User from './components/User';
import Item from './components/Item';
import Restaurant from './components/Restaurant';

import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
//
// (<Router history=(__dirname)}>
//   <Route path="/" component={App}>
//     <Route path="user" component={User} />
//     <Route path="item" component={Item} />
//     <Route path="restaurant" component={Restaurant} />
//   </Route>
// </Router>)
