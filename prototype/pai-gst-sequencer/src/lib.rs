//! gst-pai-streamer
//!
//! The purpose if this crate is to implement the ``periscopai`` sequencer.
//! The sequencer is responsible for creating the gstreamer pipeline, installing
//! the appropriate callbacks for messages and managing the pipeline state.
//!
//! It is meant to be a simple interface to gstreamer, implemented in rust and
//! which can be extended with Python.
//!
//! The python extension should be available [periscopai/dev](https://m.devpi.net/periscopai/dev)
//! on devpi.
//!
//! ```text
//!         +--------------------------+
//!         |  Rest API     - Python   |
//!         +--------------------------+
//!                     |
//!                     V
//!         +--------------------------+
//!         |  Engine       - Python   |
//!         +--------------------------+
//!                     |  
//!                     V
//!     +=================================+
//!     |         pai-gst-sequencer       |
//!     |   +--------------------------+  |
//!     |   |   PAISequencer - Rust    |  |
//!     |   +--------------------------+  |
//!     |               |                 |
//!     |               V                 |
//!     |   +--------------------------+  |
//!     |   |  AI GST Pipeline  - C    |  |
//!     |   +--------------------------+  |
//!     |                                 |
//!     +=================================+
//! ```
//!
//! **Author:** Laurent Brack
//!

/// Representation of the Sequencer state
///
/// Note that to represent Enum in prints, you need to
/// mark them as derive(Debug) and then
/// use a print statement like this
/// ``` rust
/// # use pai_gst_sequencer::*;
/// # let mut sequencer = PAISequencer::new("video");
/// println!("sequencer state '{:?}'",sequencer.state());
/// ```
/// more on [stackoverflow](https://stackoverflow.com/questions/28024373/is-there-a-way-to-print-enum-values)
extern crate gstreamer as gst;
use gst::prelude::*;

#[derive(Debug, PartialEq)] // To be able to assert on enum value - see main.rs for details.
pub enum PAISequencerState {
    /// The pipeline was created by not initialized
    CREATED,
    /// The pipeline is in error state
    ERROR,
    /// pipeline is running
    RUNNING,
    /// pipeline is stopped
    STOPPED,
}

// Class Documentation
//
/// Periscopai sequence pipeline
///
/// # Arguments
///
pub struct PAISequencer {
    /// bla
    input: String,
    state: PAISequencerState,
    source: gst::Element,
    sink: gst::Element,
    pipeline: gst::Pipeline,
}
impl PAISequencer {
    /// Constructor
    pub fn new(input: &str) -> PAISequencer {
        // Initialize GStreamer
        gst::init().unwrap();
        let instance = PAISequencer {
            input: input.to_string(),
            state: PAISequencerState::CREATED,
            source: gst::ElementFactory::make("videotestsrc", Some("source"))
                .expect("Could not create source element."),
            sink: gst::ElementFactory::make("autovideosink", Some("sink"))
                .expect("Could not create sink element"),
            pipeline: gst::Pipeline::new(Some("test-pipeline")),
        };
        // Build the pipeline
        instance
            .pipeline
            .add_many(&[&instance.source, &instance.sink])
            .unwrap();
        instance
            .source
            .link(&instance.sink)
            .expect("Elements could not be linked.");

        // Modify the source's properties
        instance.source.set_property_from_str("pattern", "smpte");

        instance
    }

    /// starts the sequencer and sets the state to RUNNING
    ///
    /// # Returns:PAISequencerState::RUNNING
    ///
    /// Note that the reference to self is set as mutable as we
    /// want to be able to change the state.
    pub fn start(&mut self) -> &PAISequencerState {
        self.state = PAISequencerState::RUNNING;
        // Start playing
        self.pipeline
            .set_state(gst::State::Playing)
            .expect("Unable to set the pipeline to the `Playing` state");

        // // Wait until error or EOS
        // let bus = self.pipeline.get_bus().unwrap();
        // for msg in bus.iter_timed(gst::CLOCK_TIME_NONE) {
        //     use gst::MessageView;

        //     match msg.view() {
        //         MessageView::Error(err) => {
        //             eprintln!(
        //                 "Error received from element {:?}: {}",
        //                 err.get_src().map(|s| s.get_path_string()),
        //                 err.get_error()
        //             );
        //             eprintln!("Debugging information: {:?}", err.get_debug());
        //             break;
        //         }
        //         MessageView::Eos(..) => break,
        //         _ => (),
        //     }
        // }

        &self.state
    }
    pub fn stop(&mut self) -> &PAISequencerState {
        self.state = PAISequencerState::STOPPED;

        self.pipeline
            .set_state(gst::State::Null)
            .expect("Unable to set the pipeline to the `Null` state");

        &self.state
    }
    ///
    pub fn state(&self) -> &PAISequencerState {
        &self.state
    }
    pub fn input(&self) -> &String {
        &self.input
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::{thread, time};

    #[test]
    fn test_states() {
        let mut sequencer = PAISequencer::new("video");
        println!("internal state {:?}", sequencer.state());
        assert!(matches!(sequencer.state(), PAISequencerState::CREATED));
        println!("sequencer state after start '{:?}'", sequencer.start());
        assert!(matches!(sequencer.state(), PAISequencerState::RUNNING));
        println!("sleeping for 2 seconds");
        thread::sleep(time::Duration::from_millis(2000));
        println!("sequencer state after stop'{:?}'", sequencer.stop());
        assert!(matches!(sequencer.state(), PAISequencerState::STOPPED));
    }
}
