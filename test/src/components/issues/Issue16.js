/* @flow */
import React, { Component } from 'react';
import { Divider, Modal } from 'react-bootstrap';
// import { Route } from 'react-router';
// import { Link } from 'react-router-dom';
import NavigationPrompt from '../../../..';

class ConfirmNavigationModal extends Component {
  render() {
    return (
      <div>
        <Modal.Dialog show={true}>
          <Modal.Body>
            <h1></h1>
            <br/>

            <br/>
            <div>
              <button style={{borderRadius:"3px"}} onClick={this.props.onCancel}>cancel</button>
              <button style={{borderRadius:"3px"}} onClick={this.props.onConfirm}>confirm</button>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    );
    // Shared in issue:
    // return (
    //   <div>
    //     <Modal show={true}>
    //       <div className="modal-size-confirmmodal modal-position-confirmmodal">
    //         <h1 className="font-position-confirmmodal" >{this.props.intl.formatMessage(generalMessages.warningLeavePage)} </h1>
    //         <br/>
    //         <Divider />
    //         <br/>
    //         <div className="button-position-confirmmodal" >
    //           <button className="button-cancel" style={{borderRadius:"3px"}} onClick={this.props.onCancel}>{this.props.intl.formatMessage(generalMessages.cancel)}</button>
    //           <button className='button-save' style={{borderRadius:"3px"}} onClick={this.props.onConfirm}>{this.props.intl.formatMessage(generalMessages.ok)}</button>
    //         </div>
    //       </div>
    //     </Modal>
    //   </div>
    // );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false
    };
  }

  render() {
    return (
      <div>
        <NavigationPrompt when={(crntLocation, nextLocation) => !nextLocation.pathname.startsWith(crntLocation.pathname)}>
        {/*<NavigationPrompt when={!this.state.submitted && this.props.dirty}>*/}
             {({onConfirm, onCancel}) => (
          <ConfirmNavigationModal when={true} onCancel={onCancel} onConfirm={onConfirm}/>
            )}
        </NavigationPrompt>
        <button id="dirtify" onClick={this.props.dirtify}>dirtify</button>
      </div>
    );
  }
}

class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dirty: false
    };
  }

  dirtify() {
    this.setState(() => ({ dirty: true }));
  }

  render() {
    return (
      <Form dirtify={this.dirtify.bind(this)} dirty={this.state.dirty}/>
    );
  }
}

class Issue11 extends Component {
  render() {
    return (
      <div>
        <Modal.Dialog when>
          HI
        </Modal.Dialog>
        <h1>Issue 16</h1>
        <Container/>
      </div>
    );
  }
}

export default Issue11;
