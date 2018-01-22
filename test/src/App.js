import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import Issues from './components/issues';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <h2>Main Nav</h2>
          <ul>
            <li><Link to="/issues">Issues</Link></li>
          </ul>
          <Switch>
            <Route path="/issues" component={Issues}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
