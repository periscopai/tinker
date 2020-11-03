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
console.log('App.js is running')

/**
 * Periscopai Application (React Component)
 */
class PeriscopaiApp extends React.Component{
  render(){
    const title = "Periscopai";
    const sub_title = "Machine Learning User Interface Test System";
    return (
        <div>
          <p>{title}</p>
          <Transport/>
          <Monitor/>
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
class TransportButton extends React.Component{
  render(){
    return(
      <button id={this.props.id}>{this.props.caption}</button>
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
class Transport extends React.Component{
  render(){
    return (
      <div>
        <p>Sequencer Transport</p>
        <TransportButton id="start_button" caption="Start"/>
        <TransportButton id="stop_button" caption="Stop"/>
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
class Monitor extends React.Component{
  //
  render(){
    return (
      <div>
        <p>MONITOR</p>
        <img src="../monitor.jpg" alt="Italian Trulli" width="600" height="315"/>
      </div>
    );
  }
}

ReactDOM.render(<PeriscopaiApp/>, document.getElementById('app'))