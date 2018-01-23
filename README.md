# React Router <NavigationPrompt/>

<a href="https://github.com/DevExpress/testcafe">
    <img alt="Tested with TestCafe" src="https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg">
</a>

## Table of Contents

#### Overview

#### Example Usage

#### API

## Overview

Promps user to confirm navigation. A replacement component for the react-router `<Prompt/>`. Allows for more flexible dialogs.

Note: Navigation away from your site, reload, or closing tab/window will also prompt navigation confirmation when `<NavigationPrompt/>`'s `props.when` is truthy.  Usually, browsers handle this navigation UX themselves, leading to vanilla alert boxes.  Also, many browsers require users to interact with your site before confirming navigation away.

Motivation: https://github.com/ReactTraining/react-router/issues/4635

Adapted from: https://gist.github.com/bummzack/a586533607ece482475e0c211790dd50

## Example Usage

#### Simplest example:

```javascript
import NavigationPrompt from 'react-router-navigation-prompt';

import ConfirmNavigationModal from './your-own-code';

<NavigationPrompt when={this.state.shouldConfirmNavigation}>
  {({onConfirm, onCancel}) => (
    <ConfirmNavigationModal when={true} onCancel={onCancel} onConfirm={onConfirm}/>
  )}
</NavigationPrompt>
```

#### Complex example:

```javascript
import NavigationPrompt from 'react-router-navigation-prompt';

import Modal from './your-own-code';

<NavigationPrompt
  beforeConfirm={this.cleanup}
  // Children will be rendered even if props.when is falsey and isActive is false:
  renderIfNotActive={true}
  // Confirm navigation if going to a path that does not start with current path:
  when={(crntLocation, nextLocation) => !nextLocation.pathname.startsWith(crntLocation.pathname)}
>
  {({isActive, onCancel, onConfirm}) => {
    if (isActive) {
      return (
        <Modal show={true}>
          <div>
            <p>Do you really want to leave?</p>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={onConfirm}>Ok</button>
          </div>
        </Modal>
      );
    }
    return (
      <div>This is probably an anti-pattern but ya know...</div>
    );
  }}
</NavigationPrompt>
```

## API

* `props`
  * afterCancel?: Function,
  * afterConfirm?: Function,
  * beforeCancel?: Function,
  * beforeConfirm?: Function,
  * children: (data: {isActive: bool, onCancel: Function, onConfirm: Function}) => React$Element<*>,
  * renderIfNotActive: bool,
  * when: bool | (Location, ?Location) => bool,
  // Added by react-router:
  * match: Match,
  * history: RouterHistory,
  * location: Location,


