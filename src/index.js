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
    this.state = {action: null, nextLocation: null, isActive: false};
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.unblock = props.history.block((nextLocation, action) => {
      if (props.when) {
        this.setState({
          action,
          nextLocation,
          isActive: true
        });
      }
      return !props.when;
    });
  }

  componentWillUnmount() {
    this.unblock();
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
    } else if (action === 'pop') {
      history.pop();
    } else {
      history.push(nextLocation.pathname);
    }
  }

  unblock() {
    // Init in constructor().
  }

  render() {
    if (!this.state.isActive) return null;
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
