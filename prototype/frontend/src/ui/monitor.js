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
    state = {
        streaming: false
    };

    onStartStreaming = () => {
      this.setState(() => ({streaming: true}));
    }
    onStopStreaming = () => {
      this.setState(() => ({streaming: false}));
    }

    render() {
      return (
        <div className='monitor'>
        <Transport onStart={this.onStartStreaming} onStop={this.onStopStreaming}/>
        <Streaming streaming={this.state.streaming}/> 
      </div>
      );
    }
  }

export default Monitor;