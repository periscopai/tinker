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
import React from 'react';
import ReactDOM from 'react-dom';
//import Button from '@material-ui/core/Button';
console.log('App.js is running')

/**
 * Periscopai Application (React Component)
 */
class PeriscopaiApp extends React.Component {
  render() {
    const title = "Periscopai";
    const sub_title = "Machine Learning User Interface Test System";
    return (
      <div>
        <p>{title}</p>
        <Transport />
        <Monitor />
      </div>
    );
  }
}

/**
 * Transport button
 * Instances of this class represent a transport button which will 
 * are responsible for reaching end points
 * @param {string} id : button identifier
 * @param {string} caption: button caption
 * 
 */
class TransportButton extends React.Component {
  render() {
    return (
      <button 
        onClick={this.props.onClick} 
        disabled={this.props.disabled}
        id={this.props.id}>
          {this.props.caption}
      </button>
    );
  }
}



/**
 * Represents the Transport component. 
 * This component contains the control and display elements 
 * of the sequencer such as number of frame processed. 
 * 
 * This could also be used to turn on (or off) bounding box 
 * overlays, highlight changes only, etc. 
 */
class Transport extends React.Component {

  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.state = {
      is_running: false
    };
  }

  start() {
    this.setState(() => {
      return { is_running: true };
    });
  }
  stop() {
    this.setState(() => {
      return { is_running: false };
    });
  }

  render() {
    return (
      <div>
        <p>Sequencer Transport{}</p>
        <TransportButton id="start_button" caption="Start" disabled={this.state.is_running} onClick={this.start} />
        <TransportButton id="stop_button" caption="Stop" disabled={!this.state.is_running} onClick={this.stop} />
        <p>STATE: {this.state.is_running ? "RUNNING" : "STOPPED"}</p>
      </div>
    );
  }
}

/**
 * Monitor component
 * 
 * The monitor component should consist of the webRTC module responsible
 * for get the video stream from the system.
 */
class Monitor extends React.Component {
  //
  render() {
    return (
      <div>
        <p>MONITOR</p>
        <img src="../monitor.jpg" alt="Italian Trulli" width="600" height="315" />
      </div>
    );
  }
}

ReactDOM.render(<PeriscopaiApp />, document.getElementById('app'))

