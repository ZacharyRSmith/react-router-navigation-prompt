/* @flow */
import React from 'react';
import {withRouter} from 'react-router-dom';
import type {HistoryAction, Location, Match, RouterHistory} from 'react-router-dom';

declare type PropsT = {
  afterCancel?: Function,
  afterConfirm?: Function,
  beforeCancel?: Function,
  beforeConfirm?: Function,
  children: (data: {isActive: bool, onCancel: Function, onConfirm: Function}) => React$Element<*>,
  match: Match,
  history: RouterHistory,
  location: Location,
  renderIfNotActive: bool,
  when: bool | (Location, ?Location) => bool
};
declare type StateT = {
  action: ?HistoryAction,
  nextLocation: ?Location,
  isActive: bool,
  unblock: Function
};

const initState = {action: null, isActive: false, nextLocation: null};
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

    (this:Object).block = this.block.bind(this);
    (this:Object).onBeforeUnload = this.onBeforeUnload.bind(this);
    (this:Object).onCancel = this.onCancel.bind(this);
    (this:Object).onConfirm = this.onConfirm.bind(this);
    (this:Object).when = this.when.bind(this);

    this.state = {...initState, unblock: props.history.block(this.block)};
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onBeforeUnload);
  }

  componentWillUnmount() {
    this.state.unblock();
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

  block(nextLocation, action) {
    if (this.when(nextLocation)) {
      this.setState({
        action,
        nextLocation,
        isActive: true
      });
    }
    return !this.when(nextLocation);
  }

  navigateToNextLocation(cb) {
    let {action, nextLocation} = this.state;
    action = {
      'POP': 'goBack',
      'PUSH': 'push',
      'REPLACE': 'replace'
    }[action || 'PUSH'];
    if (!nextLocation) nextLocation = {pathname: '/'};
    const {history} = this.props;

    this.state.unblock();
    if (action === 'goBack') {
      history.goBack();
    } else {
      history[action](nextLocation.pathname);
    }
    this.setState({
      ...initState,
      unblock: this.props.history.block(this.block)
    }, cb); // FIXME?  Does history.listen need to be used instead, for async?
  }

  onCancel() {
    (this.props.beforeCancel || ((cb) => {
     cb();
    }))(() => {
      this.setState({...initState}, this.props.afterCancel);
    });
  }

  onConfirm() {
    (this.props.beforeConfirm || ((cb) => {
     cb();
    }))(() => {
      this.navigateToNextLocation(this.props.afterConfirm);
    });
  }

  onBeforeUnload(e) {
    if (!this.when()) return;
    const msg = 'Do you want to leave this site?\n\nChanges you made may not be saved.';
    e.returnValue = msg;
    return msg;
  }

  when(nextLocation?: Location) {
    if (typeof this.props.when === 'function') {
      return this.props.when(this.props.location, nextLocation);
    } else {
      return this.props.when;
    }
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
