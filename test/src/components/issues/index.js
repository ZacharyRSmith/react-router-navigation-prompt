/* @flow */
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import Issue3 from './Issue3';
import Issue4 from './Issue4';
import Issue11 from './Issue11';
import Issue16 from './Issue16';
import Issue20 from './Issue20';

class Issues extends Component {
  render() {
    return (
      <div>
        <h2>Issues</h2>
        <ul>
          <li><Link to="/issues/3">3</Link></li>
          <li><Link to="/issues/4">4</Link></li>
          <li><Link to="/issues/11">11</Link></li>
          <li><Link to="/issues/16">16</Link></li>
          <li><Link to="/issues/20">20</Link></li>
        </ul>
        <Route path="/issues/3" component={Issue3} />
        <Route path="/issues/4" component={Issue4} />
        <Route path="/issues/11" component={Issue11} />
        <Route path="/issues/16" component={Issue16} />
        <Route path="/issues/20" component={Issue20} />
      </div>
    );
  }
}

export default withRouter(Issues);
