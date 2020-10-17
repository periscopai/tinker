# creating a basic pipeline in Rust

The goal of this exercise is to create an RTSP server (in Rust/Gstreamer) capable
of take video from a camera or file source, encoding it and streaming it over RTSP. 

We decided to start with a prototype consisting of a simple gstreamer pipeline 
written in Rust. You can find the details [here](../prototype/README.md)

---

**Idea**

All the examples I have found out there invove gst-launch building pipelines on 
the command line. However, I haven't found code example (And I believe that the 
gstreamer examples are very genric)

I did find what appears to be a Rust Example in the [gstreamer-rs]https://github.com/sdroege/gstreamer-rs/blob/master/examples/src/bin/rtsp-server.rs) project

Another avenue is Amazon Kinesis

However [Amazon Kinesis](https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/examples-gstreamer-plugin.html) has an example of such pipeline (written in C++) on gitHub calle [Amazon Kinesis Video Streams Procedure SDK](https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp). This project contains
the plugin implementation but this [sample code](https://github.com/awslabs/amazon-kinesis-video-streams-producer-sdk-cpp/blob/master/samples/kvs_gstreamer_multistream_sample.cpp) seems to have what appears to 
be an RTSP pipeline.


---

# References

## Application

- [gstreamer-rs on gitHub](https://github.com/sdroege/gstreamer-rs)

- [Writing GStreamer Applications in Rust](https://coaxion.net/blog/2017/07/writing-gstreamer-applications-in-rust/)

## Elements (a.k.a. plugins)

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