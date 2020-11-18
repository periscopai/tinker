import React from 'react';
import Transport from './transport';
import Streaming from './streaming';
/**
 * Monitor component
 * 
 * The monitor component should consist of the webRTC module responsible
 * for get the video stream from the system.
 */
class Monitor extends React.Component {
    //

    // We need to be able to access the Streaming component 
    // To establish the connecting with the WebRTC Stack
    _child = React.createRef()

    state = {
        streaming: false
    };

    onStartStreaming = () => {
      this.setState(() => ({streaming: true}));
      this._child.current.connect();
    }
    onStopStreaming = () => {
      this.setState(() => ({streaming: false}));
      console.log(this._child);
      this._child.current.disconnect();
    }

    render() {
      return (
        <div className='monitor'>
        <Transport onStart={this.onStartStreaming} onStop={this.onStopStreaming}/>
        <Streaming streaming={this.state.streaming} ref={this._child}/> 
      </div>
      );
    }
  }

export default Monitor;