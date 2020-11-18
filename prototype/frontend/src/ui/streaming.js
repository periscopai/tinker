import { Hidden } from '@material-ui/core';
import React from 'react';

/**
 * Streaming component
 * 
 * The monitor component should consist of the webRTC module responsible
 * for get the video stream from the system.
 */
class Streaming extends React.Component {
    //

    connection = undefined;
    configuration = {
        // Uncomment this code to add custom iceServers
        //"iceServers": [{ "url": "stun:stun.1.google.com:19302" }]" }]
    };

    state = {
      mediaStream: undefined
    };    

    log = (msg) => {
      console.log(`[Streaming] ${msg}`);
    }

    error = (msg, show_alert=false) => {
      msg = `ERROR [Streaming] ${msg}`
      console.log(msg);
      console.log(show_alert);
      if (show_alert){
          alert(msg);
      }
    }    


    /** This is a promise which is called from the navigator.mediaDevices.getUserMedia
     * 
     * The stream object is assigned to the source object of the HTML5 video tag.
     * 
     * Note: That nothing else works after that thanks to the shitty webrtc stuff.
     * 
     * @param {*} stream A reference to a 
     *                   [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) 
     *                   object 
     */    
    onUserMediaSuccess(stream){
      console.log(stream);
      this.setState(() => {
        return { mediaStream: stream };
      });
      const video_element = document.querySelector('#periscopai_backend');
      if (video_element){
          video_element.srcObject = stream;
          //stream.getTracks().forEach(track => myPeerConnection.addTrack(track, stream));
          if (hasRTCPeerConnection()) {
          startPeerConnection(stream);
          } else {
              this.error("Sorry, your browser does not support WebRTC.", alert=true);
          alert();
          }
      }else{
          this.error("Could not find video element 'periscopai_backend' in DOM");
      }
    }

    /** Connects to the sequencer WebRTC Session.
     * 
     */    
    connect = () => {
      this.log(`connecting to ${this.url} ${this.port}`);

      const video_element = document.querySelector('#periscopai_backend');
      if (!video_element){
          this.error("Could not find video element 'periscopai_backend' in DOM", 
                     true);
      }
      else{
          try {
              const onUserMediaSuccess = this.onUserMediaSuccess.bind(this);
              // For more details on constraint, see
              //https://tools.ietf.org/html/draft-alvestrand-constraints-resolution-03
              // Note that we could get a lot more demanding but for now let's just the 
              // basic stuff.
              const media_constraints = { video: true, audio: false };
              navigator.mediaDevices.getUserMedia(media_constraints)
              .then(onUserMediaSuccess) 
              .catch(function (error) {
                  console.log(error);
                })
          } catch (exception){
              this.error(`Exception caught when setting user media ${exception}`);
          }
      }
    }
  
    /** Disconnect from the webRTC session.
     * 
     * Right now only pauses the video 
     */
    disconnect = () => {
      this.log(`disconnecting from ${this.url} ${this.port}`);
      const video_element = document.querySelector('#periscopai_backend');
      if (video_element){
          // This is the only trick I could find on stackoverflow to make the 
          // video go away.
          this.log("Pausing the video")
          video_element.pause();
          video_element.currentTime = 0;
          video_element.srcObject = undefined;
      }

      this.connection = undefined;
      if (this.state.mediaStream){
        const video_tracks = this.state.mediaStream.getVideoTracks();
        console.log(video_tracks)
        video_tracks[0].stop();
      }
      this.setState(() => ({ mediaStream: undefined }));
    }

    /**
     * 
     */
    render() {
      console.log(this.props)
      return (
        <div>
          <div id='video-display' style={{display: this.props.streaming ? "block" : 'none'}}>
            <video id="periscopai_backend" autoPlay></video>
          </div>
          
          <div id='standby-display' style={{display: !this.props.streaming ? "block" : 'none'}}>
            <img src="../images/monitor.png" alt="Italian Trulli"/>
          </div>

          <div>
            <p>Connection Status: { JSON.stringify(this.state.mediaStream)}</p>
          </div>

        </div>
      );
    }
  }




export default Streaming;