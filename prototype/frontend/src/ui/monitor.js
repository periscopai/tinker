import React from 'react';


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

export default Monitor;