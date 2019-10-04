/* @flow */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import NavigationPrompt from '../../../..';

class PageA extends Component {
  render() {
    return (
      <div>
        <NavigationPrompt when={true}>
          {({onConfirm, onCancel}) => (
            <div>
              <button className="nav-confirm" onClick={onConfirm}>Confirm</button>
              <button className="nav-cancel" onClick={onCancel}>Cancel</button>
            </div>
          )}
        </NavigationPrompt>
        <h2>Page A</h2>
      </div>
    );
  }
}

class PageB extends Component {
  render() {
    return (
      <div>Page B</div>
    );
  }
}

class Issue3 extends Component {
  render() {
    return (
      <div>
        <h1>Issue 3</h1>
        <h2>Pages</h2>
        <ul>
          <li><Link to="/issues/3/a">a</Link></li>
          <li><Link to="/issues/3/b">b</Link></li>
        </ul>
        <Route path="/issues/3/a" component={PageA}/>
        <Route path="/issues/3/b" component={PageB}/>
      </div>
    );
  }
}

export default Issue3;
