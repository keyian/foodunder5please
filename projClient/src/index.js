import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';

// import { useBasename } from "history";

import App from './components/App';
import Feed from './components/Feed';
import Item from './components/Item';
import Restaurant from './components/Restaurant';
import User from './components/User';


import './index.css';

ReactDOM.render(
  (<Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Feed} />
      <Route path="user/:user" component={User} />
      <Route path="item" component={Item} />
      <Route path="restaurant" component={Restaurant} />
    </Route>
    <Route path="#/" component={App}>
      <Route path="user(/:user)" component={User} />
    </Route>
  </Router>),
  document.getElementById('root')
);
