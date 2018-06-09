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
  when: bool | (Location, ?Location) => bool,
  disableNative: bool,
};
declare type StateT = {
  action: ?HistoryAction,
  nextLocation: ?Location,
  isActive: bool,
  unblock: Function
};

const initState = {
  action: null,
  isActive: false,
  nextLocation: null
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
  /*:: _prevUserAction: string; */
  /*:: _isUnmounted: boolean; */

  constructor(props) {
    super(props);

    // `_prevUserAction` weirdness because setState()'s callback is not getting invoked.
    // See: See https://github.com/ZacharyRSmith/react-router-navigation-prompt/pull/9
    // I don't like making this an instance var,
    this._prevUserAction = '';
    this._isUnmounted = true;

    (this:Object).block = this.block.bind(this);
    (this:Object).onBeforeUnload = this.onBeforeUnload.bind(this);
    (this:Object).onCancel = this.onCancel.bind(this);
    (this:Object).onConfirm = this.onConfirm.bind(this);
    (this:Object).when = this.when.bind(this);

    this.state = {...initState, unblock: props.history.block(this.block)};
  }

  componentDidMount() {
    this._isUnmounted = false
    if (!this.props.disableNative) {
      window.addEventListener('beforeunload', this.onBeforeUnload);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this._prevUserAction === 'CANCEL' && typeof this.props.afterCancel === 'function') {
      this.props.afterCancel();
    } else if (this._prevUserAction === 'CONFIRM' && typeof this.props.afterConfirm === 'function') {
      this.props.afterConfirm();
    }
    this._prevUserAction = '';
  }

  componentWillUnmount() {
    if (this._prevUserAction === 'CONFIRM' && typeof this.props.afterConfirm === 'function') {
      this._prevUserAction = '';
      this.props.afterConfirm();
    }
    this.state.unblock();
    if (!this.props.disableNative) {
      window.removeEventListener('beforeunload', this.onBeforeUnload);
    }
    this._isUnmounted = true
  }

  block(nextLocation, action) {
    const result = this.when(nextLocation);
    if (result) {
      this.setState({
        action,
        nextLocation,
        isActive: true
      });
    }
    return !result;
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
    this._prevUserAction = 'CONFIRM';

    // Special handling for goBack
    if (action === 'goBack') {
      history.goBack();
      // As native history.go(-1) exetues after this method has finished, need to update state asychronously
      // otherwise it will trigger navigateToNextLocation method again
      return window.setTimeout(() => {
        // Skip state update when component has been unmounted in meanwhile. Usually this is what happens.
        if (!this._isUnmounted) {
          this.setState({
            ...initState,
            unblock: this.props.history.block(this.block)
          });
        }
      }, 0);
    }

    // $FlowFixMe history.replace()'s type expects LocationShape even though it works with Location.
    history[action](nextLocation);

    this.setState({
      ...initState,
      unblock: this.props.history.block(this.block)
    }); // FIXME?  Does history.listen need to be used instead, for async?
  }

  onCancel() {
    (this.props.beforeCancel || ((cb) => {
     cb();
    }))(() => {
      this._prevUserAction = 'CANCEL';
      this.setState({...initState});
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
