/* @flow */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import NavigationPrompt from '../../../..';

class Issue20 extends Component {
    render() {
        return (
            <div>
                <NavigationPrompt when={true}>
                    {({ onConfirm, onCancel }) => (
                        <div>
                            <button className="nav-confirm" onClick={onConfirm}>Confirm</button>
                            <button className="nav-cancel" onClick={onCancel}>Cancel</button>
                        </div>
                    )}
                </NavigationPrompt>
                <h1>Issue 20</h1>
                <ul>
                    <li><Link to="/issues/20#main" replace>without search</Link></li>
                    <li><Link to="/issues/20#main?lang=es" replace>con busca</Link></li>
                </ul>
                <Switch>
                    <Route path="/issues/20#main" render={() => (
                        <div>Hello, world!</div>
                    )} />
                    <Route path="/issues/20#main?lang=es" render={() => (
                        <div>Hola, mundo!</div>
                    )} />
                </Switch>
            </div>
        );
    }
}

export default Issue20;
