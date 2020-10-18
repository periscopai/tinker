//! Main program just to run things.
//! This obviously doesn't do anything meaning full
//!

/// We use the object which is in the same crate.
/// If we had defined an additional module, we would have added
/// the module name in the use statement
//use pai_gst_sequencer::PAISequencer;
use pai_gst_sequencer::*;

/// This is the main function
fn main() {
    let input = String::from("video");
    println!("creating AI sequencer with input '{}'", input);

    // We define the sequencer as mutable otherwise methods would
    // not be able to modify its attributes
    let mut sequencer = PAISequencer::new(&input);

    println!("sequencer state '{:?}'", sequencer.get_state());
    println!("starting the sequencer");
    let state = sequencer.start();
    println!("state returned {:?}", state);
    assert!(matches!(sequencer.get_state(), PAISequencerState::RUNNING));
    // This is interesting
    // The following would generate a compilation error rustc(E0502)
    // println!("state returned {:?}=={:?}", state, sequencer.get_state());
    // But if we left state go out of scope (not using it after the previous
    // statement), the sequencer regained the borrowed ownership.
    println!("internal state {:?}", sequencer.get_state());
    println!("stopping the sequencer");
    println!("sequencer state '{:?}'", sequencer.stop());
    // Here I have no idea why this works. Basically you can not do something like
    // assert!(sequencer.get_state() ==  PAISequencerState::STOPPED);
    // The compiler gives you an error. I found the solution below in stackoverflow
    // but don't understand it
    assert!(matches!(sequencer.get_state(), PAISequencerState::STOPPED));
    println!("This is the end of the pathetic piece of code.")
}

// Reference: https://doc.rust-lang.org/book/ch07-05-separating-modules-into-different-files.html
#[cfg(test)]
mod tests;