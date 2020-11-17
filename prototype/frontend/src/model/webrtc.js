
import adapter from 'webrtc-adapter';
/**
 * 
 */
class WebRTCToStreamingPipeline {

    constructor(){
        console.log("Creating WebRTCToStreamingPipeline");
        this.url = 'localhost';
        this.port = '1234';
        this.connection = undefined;
        this.configuration = {
            // Uncomment this code to add custom iceServers
            //"iceServers": [{ "url": "stun:stun.1.google.com:19302" }]" }]
          };
    }

    log(msg){
        console.log(`[WebRTCToStreamingPipeline] ${msg}`);
    }
    error(msg, show_alert=false){
        msg = `ERROR [WebRTCToStreamingPipeline] ${msg}`
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
        const video_element = document.querySelector('#periscopai_backend');
        if (video_element){
            video_element.srcObject = stream;
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
    connect(){
        this.log(`connecting to ${this.url} ${this.port}`);

        const video_element = document.querySelector('#periscopai_backend');
        if (!video_element){
            this.error("Could not find video element 'periscopai_backend' in DOM", 
                       true);
        }
        else{
            try {
                const onUserMediaSuccess = this.onUserMediaSuccess.bind(this);
                navigator.mediaDevices.getUserMedia({ video: true, audio: false })
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
    disconnect(){
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
    }
}

export default WebRTCToStreamingPipeline;