import React from 'react';
import axios from 'axios';

/**
 * Represents the Transport component. 
 * This component contains the control and display elements 
 * of the sequencer such as number of frame processed. 
 * 
 * This could also be used to turn on (or off) bounding box 
 * overlays, highlight changes only, etc. 
 */
class Transport extends React.Component {


    state = {
      is_running: false
    };
    axios_instance = axios.create({
      baseURL: 'http://127.0.0.1:8000/api/',
      timeout: 2000,
      method: 'no-cors',
      headers: {
                 Accept: 'application/json',
			           'Content-Type': 'application/json',
    }
    });
  
    onStart = () => {
      this.axios_instance.post('sequencer/start');
      this.setState(() => {
        return { is_running: true };
      });
    }
    onStop = () => {
      this.axios_instance.post('sequencer/stop');
      this.setState(() => {
        return { is_running: false };
      });
    }
  
    render() {
      return (
        <div>
          <p>Sequencer Transport{}</p>
          <TransportButton id="start_button" caption="Start" disabled={this.state.is_running} onClick={this.onStart} />
          <TransportButton id="stop_button" caption="Stop" disabled={!this.state.is_running} onClick={this.onStop} />
          <p>STATE: {this.state.is_running ? "RUNNING" : "STOPPED"}</p>
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

  export default Transport;
  