# creating a basic pipeline in Rust

The goal of this exercise is to create an RTSP server (in Rust/Gstreamer) capable
of take video from a camera or file source, encoding it and streaming it over RTSP. 

# References

- [2018 - How to write GStreamer Elements in Rust Part 1: A Video Filter for converting RGB to grayscale](https://coaxion.net/blog/2018/01/how-to-write-gstreamer-elements-in-rust-part-1-a-video-filter-for-converting-rgb-to-grayscale/)

- [2018 - How to write GStreamer Elements in Rust Part 2: A raw audio sine wave source](https://coaxion.net/blog/2018/02/how-to-write-gstreamer-elements-in-rust-part-2-a-raw-audio-sine-wave-source/)

- [2017 Writing GStreamer Elements in Rust (Part 4): Logging, COWs and Plugins](https://coaxion.net/blog/2017/03/writing-gstreamer-elements-in-rust-part-4-logging-cows-and-plugins/)

- [2017 - RTP for broadcasting-over-IP use-cases in GStreamer: PTP, RFC7273 for Ravenna, AES67, SMPTE 2022 & SMPTE 2110](https://coaxion.net/blog/2017/04/rtp-for-broadcasting-over-ip-use-cases-in-gstreamer-ptp-rfc7273-for-ravenna-aes67-smpte-2022-smpte-2110/)

- [2017 - A GStreamer Plugin like the Rec Button on your Tape Recorder – A Multi-Threaded Plugin written in Rust](https://coaxion.net/blog/2017/12/a-gstreamer-plugin-like-the-rec-button-on-your-tape-recorder-a-multi-threaded-plugin-written-in-rust/)

- [2017 - Writing GStreamer Applications in Rust](https://coaxion.net/blog/2017/07/writing-gstreamer-applications-in-rust/)

## RTSP 

- [Stream live video to browser using GStreamer](http://4youngpadawans.com/stream-live-video-to-browser-using-gstreamer/)

- [2020 Stream Video using Gstreamer RTSP Server](https://medium.com/@pratik.mungekar/stream-video-using-gstreamer-rtsp-server-ca498f4a54bd)

- [GStreamer RTSP Server](https://gstreamer.freedesktop.org/modules/gst-rtsp-server.html)