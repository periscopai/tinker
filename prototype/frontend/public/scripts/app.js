"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** This is a simple prototype for the web interface built using React. 
 *  Very basic at this point. 
 * 
 *  The application should give control over the system, provide a 
 *  monitoring window (webRTC) and perhaps some other features such
 *  as creating new training data on the fly (remotely controlling the 
 *  UI via the actuator and annotating it)
 * 
 * Author: Laurent Brack
 */
console.log('App.js is running');

/**
 * Periscopai Application (React Component)
 */

var PeriscopaiApp = function (_React$Component) {
  _inherits(PeriscopaiApp, _React$Component);

  function PeriscopaiApp() {
    _classCallCheck(this, PeriscopaiApp);

    return _possibleConstructorReturn(this, (PeriscopaiApp.__proto__ || Object.getPrototypeOf(PeriscopaiApp)).apply(this, arguments));
  }

  _createClass(PeriscopaiApp, [{
    key: "render",
    value: function render() {
      var title = "Periscopai";
      var sub_title = "Machine Learning User Interface Test System";
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          title
        ),
        React.createElement(Transport, null),
        React.createElement(Monitor, null)
      );
    }
  }]);

  return PeriscopaiApp;
}(React.Component);

/**
 * Transport button
 * Instances of this class represent a transport button which will 
 * are responsible for reaching end points
 * @param {string} id : button identifier
 * @param {string} caption: button caption
 * 
 */


var TransportButton = function (_React$Component2) {
  _inherits(TransportButton, _React$Component2);

  function TransportButton() {
    _classCallCheck(this, TransportButton);

    return _possibleConstructorReturn(this, (TransportButton.__proto__ || Object.getPrototypeOf(TransportButton)).apply(this, arguments));
  }

  _createClass(TransportButton, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "button",
        { id: this.props.id },
        this.props.caption
      );
    }
  }]);

  return TransportButton;
}(React.Component);

/**
 * Represents the Transport component. 
 * This component contains the control and display elements 
 * of the sequencer such as number of frame processed. 
 * 
 * This could also be used to turn on (or off) bounding box 
 * overlays, highlight changes only, etc. 
 */


var Transport = function (_React$Component3) {
  _inherits(Transport, _React$Component3);

  function Transport() {
    _classCallCheck(this, Transport);

    return _possibleConstructorReturn(this, (Transport.__proto__ || Object.getPrototypeOf(Transport)).apply(this, arguments));
  }

  _createClass(Transport, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          "Sequencer Transport"
        ),
        React.createElement(TransportButton, { id: "start_button", caption: "Start" }),
        React.createElement(TransportButton, { id: "stop_button", caption: "Stop" })
      );
    }
  }]);

  return Transport;
}(React.Component);

var Monitor = function (_React$Component4) {
  _inherits(Monitor, _React$Component4);

  function Monitor() {
    _classCallCheck(this, Monitor);

    return _possibleConstructorReturn(this, (Monitor.__proto__ || Object.getPrototypeOf(Monitor)).apply(this, arguments));
  }

  _createClass(Monitor, [{
    key: "render",

    //
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          "MONITOR"
        ),
        React.createElement("img", { src: "../monitor.jpg", alt: "Italian Trulli", width: "600", height: "315" })
      );
    }
  }]);

  return Monitor;
}(React.Component);

ReactDOM.render(React.createElement(PeriscopaiApp, null), document.getElementById('app'));
