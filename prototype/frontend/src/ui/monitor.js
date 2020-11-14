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
    render() {
      return (
        <div className='monitor'>
        <Transport/>
        <Streaming/> 
      </div>
      );
    }
  }

export default Monitor;