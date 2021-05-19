# RTSP Primer

RTP versus RTSP? For streaming media, the client needs **Session Description Protocol** ([SDP]). RTP doesn't 
deliver this information.  




[SDP]: https://en.wikipedia.org/wiki/Session_Description_Protocol
[RTSP]: https://en.wikipedia.org/wiki/Real_Time_Streaming_Protocol


gst-launch-1.0 videotestsrc ! video/x-raw,width=640,height=480 ! videoconvert ! clockoverlay ! \
x264enc tune=zerolatency ! mpegtsmux ! \
hlssink playlist-root=http://192.168.86.48:8080 location=./segment_%05d.ts target-duration=5 max-files=5


gst-launch-1.0 -v v4l2src device="/dev/video0"  ! video/x-raw,width=640,height=480 ! videoconvert ! clockoverlay ! \
videoscale ! video/x-raw,width=640, height=480 !  x264enc bitrate=256 ! video/x-h264,profile=\"high\" ! \
mpegtsmux ! hlssink  playlist-root=http://192.168.86.48:8080 location=./segment_%05d.ts target-duration=5 max-files=5