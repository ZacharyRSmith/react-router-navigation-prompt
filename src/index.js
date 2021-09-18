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
  renderIfNotActive?: bool,
  when: bool | (Location, ?Location, ?HistoryAction) => bool,
  disableNative?: bool,
  allowGoBack?: bool,
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
  /*:: _isMounted: bool; */

  constructor(props) {
    super(props);

    // `_prevUserAction` weirdness because setState()'s callback is not getting invoked.
    // See: See https://github.com/ZacharyRSmith/react-router-navigation-prompt/pull/9
    // I don't like making this an instance var,
    this._prevUserAction = '';

    // This component could be used from inside a page, and therefore could be
    // mounted/unmounted when the route changes.
    this._isMounted = true;

    (this:Object).block = this.block.bind(this);
    (this:Object).onBeforeUnload = this.onBeforeUnload.bind(this);
    (this:Object).onCancel = this.onCancel.bind(this);
    (this:Object).onConfirm = this.onConfirm.bind(this);
    (this:Object).when = this.when.bind(this);

    this.state = {...initState, unblock: () => {}/* unblock will be set in componentDidMount */};
  }

  componentDidMount() {
    if (!this.props.disableNative) {
      window.addEventListener('beforeunload', this.onBeforeUnload);
    }

    this.setState({unblock: this.props.history.block(this.block)});
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
    this._isMounted = false;
    if (this._prevUserAction === 'CONFIRM' && typeof this.props.afterConfirm === 'function') {
      this._prevUserAction = '';
      this.props.afterConfirm();
    }
    this.state.unblock();
    if (!this.props.disableNative) {
      window.removeEventListener('beforeunload', this.onBeforeUnload);
    }
  }

  block(nextLocation, action) {
    const result = this.when(nextLocation, action);
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
      'POP': this.props.allowGoBack ? 'goBack' : 'push',
      'PUSH': 'push',
      'REPLACE': 'replace'
    }[action || 'PUSH'];
    if (!nextLocation) nextLocation = {pathname: '/'};
    const {history} = this.props;

    this.state.unblock();
    this._prevUserAction = 'CONFIRM';
    if (action === 'goBack') {
      // Because there is asynchronous time between calling history.goBack()
      // and history actually changing, we need to set up this temporary callback
      // -- if we tried to run this synchronously after calling history.goBack(),
      // then navigateToNextLocation would be triggered again.
      const unlisten = history.listen(() => {
        unlisten();
        if (this._isMounted) { // Just in case we unmounted on the route change
          this.setState({
            ...initState,
            unblock: history.block(this.block)
          });
        }
      });
      history.goBack();
    } else {
      // $FlowFixMe history.replace()'s type expects LocationShape even though it works with Location.
      history[action](nextLocation); // could unmount at this point
      if (this._isMounted) { // Just in case we unmounted on the route change
        this.setState({
          ...initState,
          unblock: this.props.history.block(this.block)
        }); // FIXME?  Does history.listen need to be used instead, for async?
      }
    }
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

  when(nextLocation?: Location, action?: HistoryAction) {
    if (typeof this.props.when === 'function') {
      return this.props.when(this.props.location, nextLocation, action);
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
