/* @flow */
import React, { Component } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import NavigationPrompt from '../../../..';

class Container extends Component {
  render() {
    return (
      <div className="container" key={this.props.match.params.entityType}>
        <NavigationPrompt when={true}>
          {({onConfirm, onCancel}) => (
            <div>
              <button className="nav-confirm" onClick={onConfirm}>Confirm</button>
              <button className="nav-cancel" onClick={onCancel}>Cancel</button>
            </div>
          )}
        </NavigationPrompt>
        {this.props.match.params.entityType}
      </div>
    );
  }
}

class Issue4 extends Component {
  render() {
    return (
      <div>
        <h1>Issue 4</h1>
        <h2>Types</h2>
        <ul>
          <li><Link to="/issues/4/a">A</Link></li>
          <li><Link to="/issues/4/b">B</Link></li>
        </ul>
        <Route path="/issues/4/:entityType" component={Container}/>
      </div>
    );
  }
}

export default Issue4;
