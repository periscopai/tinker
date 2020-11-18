import React from 'react';
import Monitor from './monitor'
import Header from './header';

/**
 * Periscopai Application (React Component)
 */
class PeriscopaiApp extends React.Component {
    render() {
      const title = "Periscopai";
      const sub_title = "Machine Learning User Interface Test System";
      return (
        <div>
          <Header title={title} sub_title = {sub_title}/>
          <Monitor></Monitor>
        </div>
      );
    }
  }


  
export default PeriscopaiApp;