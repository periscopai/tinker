import React from 'react';

/**
 * Streaming component
 * 
 * The monitor component should consist of the webRTC module responsible
 * for get the video stream from the system.
 */
class Streaming extends React.Component {
    //
    render() {
      console.log(this.props)
      return (
        <div>
          <video id="periscopai_backend" autoPlay></video>
          {!this.props.streaming && <img src="../images/monitor.png" alt="Italian Trulli"  />}
        </div>
      );
    }
  }

export default Streaming;