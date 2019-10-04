/* @flow */
import React, { Component } from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import NavigationPrompt from '../../../..';

class WithPrompt extends Component {
  render() {
    return (
      <div>
        <NavigationPrompt
          afterCancel={this.props.handleAfterCancel}
          afterConfirm={this.props.handleAfterConfirm}
          when={true}
        >
          {({onConfirm, onCancel}) => (
            <div>
              <button className="nav-confirm" onClick={onConfirm}>Confirm</button>
              <button className="nav-cancel" onClick={onCancel}>Cancel</button>
            </div>
          )}
        </NavigationPrompt>
        WithPrompt
      </div>
    );
  }
}

class WithoutPrompt extends Component {
  render() {
    return (
      <div>WithoutPrompt</div>
    );
  }
}

class Issue11 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wasAfterCancelCalled: false,
      wasAfterConfirmCalled: false
    };
  }

  render() {
    return (
      <div>
        <h1>Issue 11</h1>
        <h2>Types</h2>
        <ul>
          <li><Link to="/issues/11/with-prompt">with-prompt</Link></li>
          <li><Link to="/issues/11/without-prompt">without-prompt</Link></li>
        </ul>
        <div className="was-after-cancel-called">{String(this.state.wasAfterCancelCalled)}</div>
        <div className="was-after-confirm-called">{String(this.state.wasAfterConfirmCalled)}</div>
        <Route path="/issues/11/with-prompt" render={() => (
          <WithPrompt
            handleAfterCancel={() => this.setState({ wasAfterCancelCalled: true })}
            handleAfterConfirm={() => this.setState({ wasAfterConfirmCalled: true })}
          />
        )}/>
        <Route path="/issues/11/without-prompt" component={WithoutPrompt}/>
      </div>
    );
  }
}

export default Issue11;
