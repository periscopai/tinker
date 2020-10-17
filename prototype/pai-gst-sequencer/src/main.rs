//! Main program just to run things. 
//! This obviously doesn't do anything meaning full
//! 

/// We use the object which is in the same crate.
/// If we had defined an additional module, we would have added
/// the module name in the use statement
use pai_gst_sequencer::PAISequencer;

/// This is the main function
fn main() {
    let input = String::from("video");
    let a = PAISequencer::new(&input);
    println!("Hello, world! {}",a.get_input());
}
