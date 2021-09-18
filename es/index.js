module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initState = {
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

var NavigationPrompt = function (_React$Component) {
  _inherits(NavigationPrompt, _React$Component);

  /*:: _prevUserAction: string; */
  /*:: _isMounted: bool; */

  function NavigationPrompt(props) {
    _classCallCheck(this, NavigationPrompt);

    // `_prevUserAction` weirdness because setState()'s callback is not getting invoked.
    // See: See https://github.com/ZacharyRSmith/react-router-navigation-prompt/pull/9
    // I don't like making this an instance var,
    var _this = _possibleConstructorReturn(this, (NavigationPrompt.__proto__ || Object.getPrototypeOf(NavigationPrompt)).call(this, props));

    _this._prevUserAction = '';

    // This component could be used from inside a page, and therefore could be
    // mounted/unmounted when the route changes.
    _this._isMounted = true;

    _this.block = _this.block.bind(_this);
    _this.onBeforeUnload = _this.onBeforeUnload.bind(_this);
    _this.onCancel = _this.onCancel.bind(_this);
    _this.onConfirm = _this.onConfirm.bind(_this);
    _this.when = _this.when.bind(_this);

    _this.state = _extends({}, initState, { unblock: function unblock() {} /* unblock will be set in componentDidMount */ });
    return _this;
  }

  _createClass(NavigationPrompt, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.props.disableNative) {
        window.addEventListener('beforeunload', this.onBeforeUnload);
      }

      this.setState({ unblock: this.props.history.block(this.block) });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this._prevUserAction === 'CANCEL' && typeof this.props.afterCancel === 'function') {
        this.props.afterCancel();
      } else if (this._prevUserAction === 'CONFIRM' && typeof this.props.afterConfirm === 'function') {
        this.props.afterConfirm();
      }
      this._prevUserAction = '';
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
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
  }, {
    key: 'block',
    value: function block(nextLocation, action) {
      var result = this.when(nextLocation, action);
      if (result) {
        this.setState({
          action: action,
          nextLocation: nextLocation,
          isActive: true
        });
      }
      return !result;
    }
  }, {
    key: 'navigateToNextLocation',
    value: function navigateToNextLocation(cb) {
      var _this2 = this;

      var _state = this.state,
          action = _state.action,
          nextLocation = _state.nextLocation;

      action = {
        'POP': this.props.allowGoBack ? 'goBack' : 'push',
        'PUSH': 'push',
        'REPLACE': 'replace'
      }[action || 'PUSH'];
      if (!nextLocation) nextLocation = { pathname: '/' };
      var history = this.props.history;


      this.state.unblock();
      this._prevUserAction = 'CONFIRM';
      if (action === 'goBack') {
        // Because there is asynchronous time between calling history.goBack()
        // and history actually changing, we need to set up this temporary callback
        // -- if we tried to run this synchronously after calling history.goBack(),
        // then navigateToNextLocation would be triggered again.
        var unlisten = history.listen(function () {
          unlisten();
          if (_this2._isMounted) {
            // Just in case we unmounted on the route change
            _this2.setState(_extends({}, initState, {
              unblock: history.block(_this2.block)
            }));
          }
        });
        history.goBack();
      } else {
        // $FlowFixMe history.replace()'s type expects LocationShape even though it works with Location.
        history[action](nextLocation); // could unmount at this point
        if (this._isMounted) {
          // Just in case we unmounted on the route change
          this.setState(_extends({}, initState, {
            unblock: this.props.history.block(this.block)
          })); // FIXME?  Does history.listen need to be used instead, for async?
        }
      }
    }
  }, {
    key: 'onCancel',
    value: function onCancel() {
      var _this3 = this;

      (this.props.beforeCancel || function (cb) {
        cb();
      })(function () {
        _this3._prevUserAction = 'CANCEL';
        _this3.setState(_extends({}, initState));
      });
    }
  }, {
    key: 'onConfirm',
    value: function onConfirm() {
      var _this4 = this;

      (this.props.beforeConfirm || function (cb) {
        cb();
      })(function () {
        _this4.navigateToNextLocation(_this4.props.afterConfirm);
      });
    }
  }, {
    key: 'onBeforeUnload',
    value: function onBeforeUnload(e) {
      if (!this.when()) return;
      var msg = 'Do you want to leave this site?\n\nChanges you made may not be saved.';
      e.returnValue = msg;
      return msg;
    }
  }, {
    key: 'when',
    value: function when(nextLocation, action) {
      if (typeof this.props.when === 'function') {
        return this.props.when(this.props.location, nextLocation, action);
      } else {
        return this.props.when;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.isActive && !this.props.renderIfNotActive) return null;
      return _react2.default.createElement(
        'div',
        null,
        this.props.children({
          isActive: this.state.isActive,
          onConfirm: this.onConfirm,
          onCancel: this.onCancel
        })
      );
    }
  }]);

  return NavigationPrompt;
}(_react2.default.Component);

exports.default = (0, _reactRouterDom.withRouter)(NavigationPrompt);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ })
/******/ ]);