//! gst-pai-streamer
//! 
//! The purpose if this crate is to implement the ``periscopai`` sequencer.
//! The sequencer is responsible for creating the gstreamer pipeline, installing
//! the appropriate callbacks for messages and managing the pipeline state. 
//! 
//! It is meant to be a simple interface to gstreamer, implemented in rust and 
//! which can be extended with Python. 
//! 
//! ```
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
    //mut state : bool,
}
impl PAISequencer {

    /// Constructor 
    pub fn new(input: &str) -> PAISequencer {
        PAISequencer {
            input: input.to_string(),
            state: PAISequencerState::CREATED
        }
    }

    pub fn start(&self) -> &PAISequencerState {
        self.get_state()
    }
    pub fn stop(&self) -> &PAISequencerState {
        self.get_state()
    }
    ///
    pub fn get_state(&self) -> &PAISequencerState {
        &self.state
    }
    pub fn get_input(&self) -> &String {
        &self.input
    }
}



#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}


