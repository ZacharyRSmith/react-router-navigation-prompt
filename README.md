# React Router <NavigationPrompt/>

<a href="https://github.com/DevExpress/testcafe">
    <img alt="Tested with TestCafe" src="https://img.shields.io/badge/tested%20with-TestCafe-2fa4cf.svg">
</a>

## Table of Contents

#### Overview

#### Demo

#### Example Usage

#### API

## Overview

Prompts user to confirm navigation. A replacement component for the react-router `<Prompt/>` (this still uses react-router to work). Allows for more flexible dialogs.

**Note: Currently tested using only react-router's `BrowserHistory`. `HashHistory` has issues: https://github.com/ZacharyRSmith/react-router-navigation-prompt/issues/36**

**Note: Navigation away from your site, reload, or closing tab/window will also prompt navigation confirmation when `<NavigationPrompt/>`'s `props.when` is truthy. However, for security concerns browsers usually handle this navigation UX themselves, leading to vanilla alert boxes. Also, many browsers require users to interact with your site before confirming navigation away.**

**Note: If you pass a function to `props.when`, then make sure to check if `nextLocation` and `action` are defined before trying to use them.**

**Note: Just like react-router's `<Prompt/>`, this component does not work with multiple `BrowserHistory`s: https://github.com/ZacharyRSmith/react-router-navigation-prompt/issues/77 **

Motivation: https://github.com/ReactTraining/react-router/issues/4635

Adapted from: https://gist.github.com/bummzack/a586533607ece482475e0c211790dd50

## Demo

Below is a gif of `<Prompt />` and a gif of `<NavigationPrompt />`, with links to sandboxes to try them yourself:

This gif shows react-router's `<Prompt />`, which relies on the browser's alert boxes. You can try it [here](https://codesandbox.io/s/sleepy-dubinsky-3yc4k?file=/src/index.js)

![demo 1 gif](https://media.giphy.com/media/2t9sbep1TtRTHF2YJD/giphy.gif)

This gif shows `<NavigationPrompt />`, which enables custom dialogs _except when the browser requires a vanilla alert box for security reasons_. You can try it [here](https://9q3wn56zrp.codesandbox.io)

![demo 2 gif](https://media.giphy.com/media/oVkikQIhaZIzcEBK70/giphy.gif)

## Example Usage

#### Simplest example:

```javascript
import NavigationPrompt from "react-router-navigation-prompt";

import ConfirmNavigationModal from "./your-own-code";

<NavigationPrompt when={this.state.shouldConfirmNavigation}>
  {({ onConfirm, onCancel }) => (
    <ConfirmNavigationModal
      when={true}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  )}
</NavigationPrompt>;
```

#### Complex example:

```javascript
import NavigationPrompt from "react-router-navigation-prompt";

import Modal from "./your-own-code";

<NavigationPrompt
  beforeConfirm={(clb)=>this.cleanup(clb)} //call the callback function when finished cleaning up
  // Children will be rendered even if props.when is falsey and isActive is false:
  renderIfNotActive={true}
  // Confirm navigation if going to a path that does not start with current path:
  when={(crntLocation, nextLocation, _action) =>
    !nextLocation || !nextLocation.pathname.startsWith(crntLocation.pathname)
  }
>
  {({ isActive, onCancel, onConfirm }) => {
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
    return <div>This is probably an anti-pattern but ya know...</div>;
  }}
</NavigationPrompt>;
```

## API

- `props`
  - afterCancel?: Function,
  - afterConfirm?: Function,
  - allowGoBack: bool (use _goBack_ method instead of _push_ when navigating back -- !! NOTE WELL !! it will _always_ navigate back only 1 item, even when it should navigate back more items.  read more: https://github.com/ZacharyRSmith/react-router-navigation-prompt/pull/30),
  - beforeCancel?: Function,
  - beforeConfirm?: Function,
  - children: (data: {isActive: bool, onCancel: Function, onConfirm: Function}) => React$Element<\*>,
  - renderIfNotActive: bool,
  - when: bool | (Location, ?Location, ?HistoryAction) => bool,
  - disableNative: bool,
    // Added by react-router:
  - match: Match,
  - history: RouterHistory,
  - location: Location,
