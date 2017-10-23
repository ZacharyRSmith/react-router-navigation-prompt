import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

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
class NavigationPrompt extends React.Component
{
  constructor(props) {
    super(props);
    this.onBeforeUnload = this.onBeforeUnload.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.unblock = props.history.block((nextLocation, action) => {
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

  onCancel() {
    this.setState({action: null, nextLocation: null, isActive: false});
  }

  onConfirm() {
    this.navigateToNextLocation();
  }

  navigateToNextLocation() {
    let {action, nextLocation} = this.state;
    action = action.toLowerCase();
    const {history} = this.props;

    this.unblock();
    if (typeof history[action] === 'function') {
      history[action](nextLocation.pathname);
    } else if (action === 'pop' && typeof history.goBack === 'function') {
      history.goBack();
    } else {
      history.push(nextLocation.pathname);
    }
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

NavigationPrompt.propTypes = {
  when: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
};

export default withRouter(NavigationPrompt);
