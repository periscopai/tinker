import React from 'react';
import Transport from './transport';
import Monitor from './monitor'

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


  
export default PeriscopaiApp;