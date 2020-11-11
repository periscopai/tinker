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
import PeriscopaiApp from './ui/periscopai-app'
//import Button from '@material-ui/core/Button';
console.log('App.js is running')
ReactDOM.render(<PeriscopaiApp />, document.getElementById('app'));

