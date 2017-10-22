# React Router <NavigationPrompt/>

## Table of Contents

#### Overview

#### Example Usage

## Overview

A replacement component for the react-router `<Prompt/>`. Allows for more flexible dialogs.

Motivation: https://github.com/ReactTraining/react-router/issues/4635

Adapted from: https://gist.github.com/bummzack/a586533607ece482475e0c211790dd50

## Example Usage

```javascript
<NavigationPrompt when={this.state.shouldConfirmNavigation}>
  {({onConfirm, onCancel}) => (
    <Modal show={true}>
      <div>
        <p>Do you really want to leave?</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Ok</button>
      </div>
    </Modal>
  )}
</NavigationPrompt>
```

```javascript
<NavigationPrompt when={this.state.shouldConfirmNavigation}>
  {({onConfirm, onCancel}) => (
    <div>
      <p>Do you really want to leave?</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onConfirm}>Ok</button>
    </div>
  )}
</NavigationPrompt>
```
