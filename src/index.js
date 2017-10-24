/* @flow */
import React from 'react';
import {withRouter} from 'react-router-dom';
import type {HistoryAction, Location, RouterHistory} from 'react-router-dom';

declare type PropsT = {
  children: (data: {isActive: bool, onCancel: Function, onConfirm: Function}) => React$Element<*>,
  history: RouterHistory,
  renderIfNotActive: bool,
  when: bool
};
declare type StateT = {
  action: ?HistoryAction,
  nextLocation: ?Location,
  isActive: bool
};

/**
 * A replacement component for the react-router `Prompt`.
 * Allows for more flexible dialogs.
 *
 * @example
 * <NavigationPrompt when={this.props.isDirty}>
 *   {({isActive, onConfirm, onCancel}) => (
 *     <Modal show={isActive}>
 *       <div>
 *         <p>Do you really want to leave?</p>
 *         <button onClick={onCancel}>Cancel</button>
 *         <button onClick={onConfirm}>Ok</button>
 *       </div>
 *     </Modal>
 *   )}
 * </NavigationPrompt>
 */
class NavigationPrompt extends React.Component<PropsT, StateT> {
  constructor(props) {
    super(props);
    (this:Object).onBeforeUnload = this.onBeforeUnload.bind(this);
    (this:Object).onCancel = this.onCancel.bind(this);
    (this:Object).onConfirm = this.onConfirm.bind(this);
    (this:Object).unblock = props.history.block((nextLocation, action) => {
      if (this.props.when) {
        this.setState({
          action,
          nextLocation,
          isActive: true
        });
      }
      return !this.props.when;
    });
    this.state = {action: null, nextLocation: null, isActive: false};
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onBeforeUnload);
  }

  componentWillUnmount() {
    this.unblock();
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

  navigateToNextLocation() {
    let {action, nextLocation} = this.state;
    action = {
      'POP': 'goBack',
      'PUSH': 'push',
      'REPLACE': 'replace'
    }[action || 'PUSH'];
    if (!nextLocation) nextLocation = {pathname: '/'};
    const {history} = this.props;

    this.unblock();
    if (action === 'goBack') return void history.goBack();
    history[action](nextLocation.pathname);
  }

  onCancel() {
    this.setState({action: null, nextLocation: null, isActive: false});
  }

  onConfirm() {
    this.navigateToNextLocation();
  }

  onBeforeUnload(e) {
    if (!this.props.when) return;
    const msg = 'Do you want to leave this site?\n\nChanges you made may not be saved.';
    e.returnValue = msg;
    return msg;
  }

  unblock() {
    // Init in constructor().
  }

  render() {
    if (!this.state.isActive && !this.props.renderIfNotActive) return null;
    return (
      <div>
        {this.props.children({
          isActive: this.state.isActive,
          onConfirm: this.onConfirm,
          onCancel: this.onCancel
        })}
      </div>
    );
  }
}

export default withRouter(NavigationPrompt);
